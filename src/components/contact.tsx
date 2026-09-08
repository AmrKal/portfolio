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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setSent(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Both halves need encoding — the subject was previously interpolated raw,
    // so any "&", "#" or line break in a name corrupted the mailto URL.
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nReply to: ${form.email}`,
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

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

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button
          type="submit"
          className="rounded bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          Send Message
        </button>

        <p aria-live="polite" className="text-sm text-neutral-600 dark:text-neutral-400">
          {sent
            ? "Your email client should have opened with the message ready to send."
            : "This opens a pre-filled email in your own mail client."}
        </p>
      </form>
    </Section>
  );
}
