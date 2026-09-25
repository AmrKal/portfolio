import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const highlights = [
  "Python",
  "FastAPI",
  "REST APIs",
  "Automation",
  "Next.js",
];

export default async function OpengraphImage() {
  // Read from disk rather than fetching a URL: this runs at build time, when
  // the site is not yet serving.
  const photo = await readFile(join(process.cwd(), "public", "profile.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 80px",
          background: "#020617",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Satori renders plain <img>; next/image is not available here. */}
        <img
          src={photoSrc}
          alt=""
          width={300}
          height={300}
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "top",
            border: "6px solid #1e293b",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", width: 596 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 36, color: "#94a3b8", marginTop: 8 }}>
            {site.role}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 36,
              width: "100%",
            }}
          >
            {highlights.map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 22,
                  color: "#5eead4",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: 999,
                  padding: "8px 20px",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div style={{ fontSize: 24, color: "#64748b", marginTop: 40 }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
