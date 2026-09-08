import Section from "./section";

const paragraphs = [
  <>
    I&rsquo;m <strong className="font-semibold">Amr Kalany</strong>, a
    multidisciplinary software engineer with a passion for building across the
    stack — from low-level embedded systems to AI-powered web applications. With
    a B.Sc. in Software Engineering and a diverse project portfolio, I thrive at
    the intersection of hardware, software, and intelligent automation.
  </>,
  <>
    I&rsquo;ve built tools that range from OpenAI-driven code reviewers to
    real-time embedded controllers, always aiming for clarity, performance, and
    purpose. Whether I&rsquo;m working with{" "}
    <strong className="font-semibold">C++ on microcontrollers</strong> or{" "}
    <strong className="font-semibold">React and Python on the cloud</strong>, I
    value clean code, full ownership, and systems that scale.
  </>,
  <>
    Beyond code, I&rsquo;m driven by curiosity and continuous learning — from
    machine learning and backend infrastructure to CI/CD, DevOps, and everything
    in between. I&rsquo;m always looking for opportunities to grow and contribute
    to meaningful projects that make an impact.
  </>,
];

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
