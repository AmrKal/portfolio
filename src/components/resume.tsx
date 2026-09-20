import { Download } from "lucide-react";
import Section from "./section";
import { site } from "@/lib/site";

type Entry = {
  title: string;
  meta: string;
  points?: string[];
};

type ResumeGroup = {
  heading: string;
  entries: Entry[];
};

const groups: ResumeGroup[] = [
  {
    heading: "Education",
    entries: [
      {
        title: "B.Sc. in Software Engineering",
        meta: "Braude College of Engineering, Karmiel (2019–2024)",
        points: [
          "Capstone: Inventory system for electrical supply chain",
          "Relevant courses: OS, Real-Time, ML, Cybersecurity, UI/UX",
        ],
      },
    ],
  },
  {
    heading: "Certifications",
    entries: [
      {
        title: "Machine Learning Specialization",
        meta: "DeepLearning.AI (Coursera) – 2024",
      },
      { title: "Google Data Analytics Certificate", meta: "Coursera – 2024" },
      { title: "React Native – The Practical Guide", meta: "Udemy – 2024" },
      { title: "100 Days of Code: Python Bootcamp", meta: "Udemy – 2024" },
    ],
  },
  {
    heading: "Professional Experience",
    entries: [
      {
        title: "Automation Technician",
        meta: "Golan Heights (Jan 2024 – Jun 2024)",
        points: [
          "Programmed and maintained robotic systems (Unitronics, Assembly)",
          "Diagnosed and repaired electromechanical faults in automation lines",
          "Gained hands-on experience with low-level control systems",
        ],
      },
    ],
  },
  {
    heading: "Additional Education",
    entries: [
      {
        title: "High School Certificate",
        meta: "Majdal Shams (2016)",
        points: [
          "Physics, Math, and English – 5 units",
          "Computer Science – 10 units",
        ],
      },
    ],
  },
];

export default function Resume() {
  return (
    <Section id="resume" title="Resume">
      <a
        href={site.cv}
        download
        className="mb-10 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download CV (PDF)
      </a>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.heading}>
            <h3 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              {group.heading}
            </h3>
            <div className="space-y-6 border-l-2 border-blue-500 pl-4">
              {group.entries.map((entry) => (
                <div key={entry.title}>
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                    {entry.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {entry.meta}
                  </p>
                  {entry.points && (
                    <ul className="mt-2 list-inside list-disc text-sm text-neutral-700 dark:text-neutral-300">
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
