import { Download, GraduationCap } from "lucide-react";
import Section from "./section";
import { site } from "@/lib/site";

const experience = [
  {
    role: "QA Tester",
    company: "Quality AI · Bank Hapoalim",
    location: "Tel Aviv, Israel",
    period: "2026 — Present",
    points: [
      "Validate banking workflows through functional, regression and sanity testing, documenting reproducible defects for engineering teams.",
      "Work with developers, product managers and QA peers to investigate issues and support reliable releases in a regulated setting.",
    ],
  },
  {
    role: "Automation Technician",
    company: "Gamatek",
    location: "Golan Heights, Israel",
    period: "Jan — Jun 2024",
    points: [
      "Programmed PLC and robotic automation using Unitronics and low-level controls, translating operational issues into corrective changes.",
      "Traced failures across software, electrical and mechanical layers to identify root causes and restore system reliability.",
    ],
  },
];

const training = [
  "QA Training · 2025",
  "Machine Learning in Production, DeepLearning.AI · 2025",
  "Machine Learning Specialization, DeepLearning.AI · 2024",
  "AWS Solutions Architect Associate course · 2025",
];

export default function Resume() {
  return (
    <Section
      id="resume"
      eyebrow="Experience"
      title="Engineering informed by real operating environments."
      intro="From regulated financial software to industrial automation, my work has always rewarded careful diagnosis and dependable delivery."
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <ol className="relative border-l border-slate-300 dark:border-slate-700">
            {experience.map((entry) => (
              <li key={entry.role} className="relative pb-12 pl-8 last:pb-0">
                <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-4 border-stone-50 bg-teal-500 dark:border-slate-950" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{entry.role}</h3>
                    <p className="mt-1 font-medium text-teal-700 dark:text-teal-300">{entry.company}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{entry.period}</p>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{entry.location}</p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {entry.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl bg-slate-950 p-7 text-white dark:border dark:border-slate-800">
            <GraduationCap className="h-7 w-7 text-teal-300" aria-hidden="true" />
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Education</p>
            <h3 className="mt-2 text-xl font-semibold">B.Sc. Software Engineering</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Braude College of Engineering · 2019 — 2024</p>
            <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-6 text-slate-400">
              Capstone: full-stack inventory and order management system.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-950 dark:text-white">Professional development</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {training.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <a
            href={site.cv}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-teal-500 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-slate-700 dark:text-white dark:hover:border-teal-300 dark:hover:text-teal-300"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download the full CV
          </a>
        </div>
      </div>
    </Section>
  );
}
