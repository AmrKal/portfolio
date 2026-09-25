"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FileText, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { sections, site, socialLinks } from "@/lib/site";

const iconLinks = [
  { name: "GitHub", href: socialLinks[0].href, Icon: Github },
  { name: "LinkedIn", href: socialLinks[1].href, Icon: Linkedin },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [isOpen, setIsOpen] = useState(false);

  // A nav click scrolls to a section, but content that lands mid-scroll — the
  // GitHub feed resolving — moves that section after the animation has already
  // committed to a target. The browser's scroll anchoring does not correct an
  // in-flight smooth scroll, so the page settles short of where it was asked
  // to go. Remember the requested section and re-issue the scroll whenever the
  // layout shifts underneath it.
  const pendingTarget = useRef<string | null>(null);

  const requestSection = (id: string) => {
    pendingTarget.current = id;
    setIsOpen(false);
  };

  useEffect(() => {
    // Stop chasing the target once the reader takes over, or after the page
    // has had long enough to settle.
    const release = () => {
      pendingTarget.current = null;
    };
    const events = ["wheel", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, release, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, release));
  }, []);

  // Scroll-spy. The active section is derived from geometry rather than from
  // intersection ratios, which are relative to each element's own height and
  // so let a short section outscore a tall one that actually fills the band.
  //
  // The recompute is driven by scroll events rather than by an
  // IntersectionObserver. An observer only fires when a threshold boundary is
  // crossed, so a scroll that settles between thresholds — the tail of a
  // smooth scroll, or a few pixels of wheel movement — produced no callback
  // and left the highlight on whatever it had decided mid-scroll.
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

      // Arrived where the click asked for; stop re-issuing the scroll.
      if (pendingTarget.current === current) pendingTarget.current = null;

      setActiveSection(current);
    };

    // Coalesce to at most one recompute per frame, so a burst of scroll
    // events costs five rect reads rather than five per event.
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pickActive();
      });
    };

    // Content that arrives after mount (the GitHub feed, images) changes
    // section offsets without any scroll happening.
    const onLayoutShift = () => {
      const target = pendingTarget.current;
      if (target) {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
      schedule();
    };

    const resizeObserver = new ResizeObserver(onLayoutShift);
    resizeObserver.observe(document.body);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    pickActive();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
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
    <nav aria-label="Section navigation" className="mt-8 w-full">
      <ul className="flex flex-col space-y-1 text-sm font-medium">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => requestSection(id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${
                  isActive
                    ? "bg-white/10 font-semibold text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-teal-300" : "bg-slate-700"}`}
                  aria-hidden="true"
                />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const socials = (
    <div className="w-full space-y-5">
      <a
        href={`mailto:${site.email}`}
        className="flex items-center justify-center gap-2 rounded-full bg-teal-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Let&rsquo;s talk
      </a>
      <div className="flex items-center justify-center gap-3">
        {iconLinks.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </a>
        ))}
        <a
          href={site.cv}
          aria-label="Download CV"
          download
          className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
        >
          <FileText className="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <p className="text-center text-xs text-slate-500">{site.location}</p>
    </div>
  );

  const profile = (
    <div className="flex w-full flex-col items-center">
      <div className="relative">
        <Image
          src={site.profileImage}
          alt={`Portrait of ${site.name}`}
          width={88}
          height={88}
          priority
          className="h-22 w-22 rounded-2xl border border-white/10 object-cover object-top"
        />
        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-4 border-slate-950 bg-teal-300" aria-hidden="true" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold tracking-tight">{site.name}</p>
        <p className="mt-1 text-sm text-slate-400">{site.role}</p>
      </div>
      {navigation}
    </div>
  );

  return (
    <>
      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 text-white backdrop-blur lg:hidden">
        <div>
          <span className="font-semibold">{site.name}</span>
          <span className="ml-2 text-xs text-teal-300">Backend</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
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
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between gap-8 overflow-y-auto bg-slate-950 px-6 py-10 text-white shadow-xl lg:hidden"
          >
            {profile}
            {socials}
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed hidden h-screen w-72 flex-col items-center justify-between overflow-y-auto border-r border-white/5 bg-slate-950 px-7 py-10 text-white lg:flex">
        {profile}
        {socials}
      </aside>
    </>
  );
}
