import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact endpoint. Sends through Resend's REST API directly rather than
 * pulling in the SDK, so the site keeps a single runtime dependency.
 *
 * Requires RESEND_API_KEY and CONTACT_FROM_EMAIL. When they are absent the
 * route reports that delivery is unconfigured and the client falls back to
 * opening the visitor's own mail client, which is the previous behaviour.
 */

const MAX_LENGTHS = { name: 100, email: 200, message: 5000 } as const;

// Best-effort throttle. Serverless instances are not shared, so this limits a
// single warm instance rather than the whole deployment; it is a speed bump
// for casual abuse, not a security control.
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 1000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "unconfigured", message: "Email delivery is not configured." },
      { status: 501 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many messages. Try again shortly." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;

  // Honeypot: a hidden field real visitors never fill in. Answer 200 so bots
  // cannot distinguish a rejection from a success.
  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "missing_fields", message: "Name, email and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "invalid_email", message: "That email address looks wrong." },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json(
      { error: "too_long", message: "That message is too long." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n—\nFrom: ${name} <${email}>`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the message:", response.status, detail);
      return NextResponse.json(
        { error: "send_failed", message: "Could not send the message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route failed:", error);
    return NextResponse.json(
      { error: "send_failed", message: "Could not send the message." },
      { status: 502 },
    );
  }
}
