import {
  Blocks,
  Bot,
  Database,
  Gauge,
  PanelsTopLeft,
  Server,
  type LucideIcon,
} from "lucide-react";
import Section from "./section";

type SkillGroup = {
  heading: string;
  description: string;
  Icon: LucideIcon;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  { heading: "Backend", description: "Services and application logic", Icon: Server, items: ["Python", "FastAPI", "Node.js", "REST APIs", "SQL"] },
  { heading: "Integrations", description: "Systems that connect and automate", Icon: Bot, items: ["GitHub API", "OpenAI API", "Email parsing", "Binance API"] },
  { heading: "Frontend", description: "Product interfaces that ship", Icon: PanelsTopLeft, items: ["React", "Next.js", "TypeScript", "JavaScript"] },
  { heading: "Data", description: "Storage, analysis and pipelines", Icon: Database, items: ["MongoDB", "MySQL", "Pandas", "NumPy"] },
  { heading: "Delivery", description: "From source to production", Icon: Blocks, items: ["Docker", "GitHub Actions", "Git", "Linux"] },
  { heading: "Quality", description: "Confidence before release", Icon: Gauge, items: ["Functional testing", "Regression testing", "Debugging"] },
];

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="A practical stack for building and shipping."
      intro="Backend depth, enough frontend range to finish the product, and a testing mindset throughout."
    >
      <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-slate-800 dark:bg-slate-800">
        {skillGroups.map(({ heading, description, Icon, items }) => (
          <article key={heading} className="bg-white p-6 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{heading}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
              </div>
              <span className="rounded-xl bg-teal-50 p-2.5 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm">
              {items.map((item) => (
                <li key={item} className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
