import { Braces, CheckCircle2, Workflow } from "lucide-react";
import Section from "./section";

const signals = [
  { value: "60%", label: "less manual inventory tracking with PowerStock" },
  { value: "5", label: "selected products across automation, APIs and web" },
  { value: "B.Sc.", label: "Software Engineering, Braude College" },
];

const principles = [
  {
    Icon: Braces,
    title: "Backend first",
    text: "Python services, REST APIs, integrations and data flows designed around clear contracts.",
  },
  {
    Icon: Workflow,
    title: "End-to-end delivery",
    text: "Comfortable moving from backend logic and databases to a polished React or Next.js interface.",
  },
  {
    Icon: CheckCircle2,
    title: "Quality in the loop",
    text: "Production-minded debugging and testing shaped by hands-on QA work in financial software.",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="Profile"
      title="I turn operational friction into dependable software."
      intro="My strongest work sits where backend engineering, automation and real product needs meet."
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="space-y-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
          <p>
            I build Python APIs, data pipelines and automation tools, then carry
            them through to usable products with TypeScript, React and Next.js.
            I care about practical outcomes: fewer manual steps, clearer data and
            systems that are easier to operate.
          </p>
          <p>
            My current QA work on banking software adds another lens to how I
            engineer: traceable behavior, reproducible defects and reliable
            releases. Earlier automation work taught me to diagnose failures
            across software, electrical and mechanical layers instead of stopping
            at the first symptom.
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {signals.map(({ value, label }) => (
            <div
              key={value}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <dd className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {value}
              </dd>
              <dt className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {principles.map(({ Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60"
          >
            <Icon className="h-6 w-6 text-teal-600 dark:text-teal-300" aria-hidden="true" />
            <h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
