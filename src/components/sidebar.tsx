"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { sections, site, socialLinks } from "@/lib/site";

const iconLinks = [
  { name: "GitHub", href: socialLinks[0].href, Icon: Github },
  { name: "LinkedIn", href: socialLinks[1].href, Icon: Linkedin },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [isOpen, setIsOpen] = useState(false);

  // Scroll-spy. The observer is only a cheap trigger — the active section is
  // then derived from geometry. Comparing intersectionRatio between sections
  // does not work, because ratio is relative to each element's own height: a
  // short section sitting in the band scores higher than a tall one filling
  // it, so the tall section never wins.
  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const pickActive = () => {
      // The last section whose top has passed the reference line is current.
      const anchor = window.innerHeight * 0.3;
      let current = elements[0].id;

      for (const el of elements) {
        if (el.getBoundingClientRect().top <= anchor) current = el.id;
      }

      // At the very bottom, a short final section may never reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = elements[elements.length - 1].id;

      setActiveSection(current);
    };

    const observer = new IntersectionObserver(pickActive, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    elements.forEach((el) => observer.observe(el));
    pickActive();

    return () => observer.disconnect();
  }, []);

  // Close the mobile drawer on Escape, and stop the page behind it scrolling.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    // Close the drawer if the viewport grows to the desktop breakpoint,
    // where the persistent sidebar takes over.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [isOpen]);

  const navigation = (
    <nav aria-label="Section navigation" className="mt-6 w-full">
      <ul className="flex flex-col space-y-2 text-sm font-medium">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setIsOpen(false)}
                className={`block rounded px-4 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  isActive
                    ? "bg-neutral-800 font-semibold text-white"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const socials = (
    <div className="flex flex-col items-center gap-4">
      <div className="flex space-x-4 text-sm">
        {socialLinks.slice(2).map(({ name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 transition hover:text-white hover:underline"
          >
            {name}
          </a>
        ))}
      </div>
      <div className="flex space-x-4">
        {iconLinks.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="rounded transition hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );

  const profile = (
    <div className="flex flex-col items-center space-y-4">
      <Image
        src={site.profileImage}
        alt={`Portrait of ${site.name}`}
        width={96}
        height={96}
        priority
        className="h-24 w-24 rounded-full border border-neutral-700 object-cover"
      />
      <div className="text-center">
        <p className="text-xl font-semibold">{site.name}</p>
        <p className="text-sm text-neutral-400">{site.role}</p>
      </div>
      {navigation}
    </div>
  );

  return (
    <>
      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 text-white lg:hidden">
        <span className="font-semibold">{site.name}</span>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="rounded p-2 transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </header>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav"
            className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between gap-8 overflow-y-auto bg-neutral-900 px-6 py-10 text-white shadow-xl lg:hidden"
          >
            {profile}
            {socials}
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed hidden h-screen w-64 flex-col items-center justify-between overflow-y-auto bg-neutral-900 px-6 py-10 text-white shadow-md lg:flex">
        {profile}
        {socials}
      </aside>
    </>
  );
}
