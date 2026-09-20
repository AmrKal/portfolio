import { Code, Cpu, Server, type LucideIcon } from "lucide-react";
import Section from "./section";

type SkillGroup = {
  heading: string;
  Icon: LucideIcon;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  {
    heading: "Languages",
    Icon: Code,
    items: ["C / C++", "Python", "TypeScript", "JavaScript", "Java", "C#"],
  },
  {
    heading: "Frameworks & Libraries",
    Icon: Server,
    items: [
      "React / Next.js",
      "Node.js",
      "Tailwind CSS",
      "React Native",
      "MongoDB / MySQL",
      "OpenAI API",
    ],
  },
  {
    heading: "Systems & Tools",
    Icon: Cpu,
    items: [
      "Git / GitHub",
      "Docker",
      "CI/CD",
      "Linux / Bash",
      "Unit Testing",
      "Embedded Systems / RTOS",
    ],
  },
];

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="space-y-10">
        {skillGroups.map(({ heading, Icon, items }) => (
          <div key={heading}>
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              <Icon
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                aria-hidden="true"
              />
              {heading}
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="rounded bg-neutral-100 px-4 py-2 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
