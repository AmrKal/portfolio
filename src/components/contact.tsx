"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, type LucideIcon } from "lucide-react";
import Section from "./section";
import { site, socialLinks } from "@/lib/site";

const directLinks: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "github.com/amrkal", href: socialLinks[0].href, Icon: Github },
  { label: "linkedin.com/in/amrkal", href: socialLinks[1].href, Icon: Linkedin },
];

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
] as const;

const inputClasses =
  "mt-1 block w-full rounded border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "mailto" }
  | { state: "error"; message: string };

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // Honeypot. Bots fill every field they find; real visitors never see this.
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setStatus({ state: "idle" });
  };

  /**
   * Fallback used when the server has no mail credentials configured.
   * Both halves need encoding: an unencoded "&" or "#" corrupts the URL.
   */
  const openMailClient = () => {
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nReply to: ${form.email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus({ state: "mailto" });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company }),
      });

      // 501 means delivery is not configured on this deployment.
      if (response.status === 501) {
        openMailClient();
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setStatus({
          state: "error",
          message:
            (data as { message?: string } | null)?.message ??
            "Something went wrong. Please email me directly.",
        });
        return;
      }

      setForm({ name: "", email: "", message: "" });
      setStatus({ state: "sent" });
    } catch {
      // Network failure: fall back rather than losing what they typed.
      openMailClient();
    }
  };

  const statusMessage = {
    idle: "I usually reply within a day or two.",
    sending: "Sending…",
    sent: "Thanks — your message is on its way. I’ll get back to you soon.",
    mailto: "Your email client should have opened with the message ready to send.",
    error: "",
  }[status.state];

  return (
    <Section id="contact" title="Contact" intro="Feel free to reach out:">
      <ul className="mb-10 space-y-2 text-lg">
        {directLinks.map(({ label, href, Icon }) => (
          <li key={href} className="flex items-center gap-2">
            <Icon
              className="h-5 w-5 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="relative space-y-6">
        {fields.map(({ name, label, type, autoComplete }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              {label}
              <span className="text-red-500" aria-hidden="true">
                {" "}
                *
              </span>
            </label>
            <input
              id={name}
              name={name}
              type={type}
              autoComplete={autoComplete}
              value={form[name]}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >
            Message
            <span className="text-red-500" aria-hidden="true">
              {" "}
              *
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className={inputClasses}
          />
        </div>

        {/* Honeypot: visually hidden and skipped by keyboard and screen readers. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company (leave blank)</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status.state === "sending"}
          className="rounded bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send Message"}
        </button>

        <p
          aria-live="polite"
          className={`text-sm ${
            status.state === "error"
              ? "text-red-600 dark:text-red-400"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
        >
          {status.state === "error" ? status.message : statusMessage}
        </p>
      </form>
    </Section>
  );
}
