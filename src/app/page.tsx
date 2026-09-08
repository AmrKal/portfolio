import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Contact from "@/components/contact";
import Projects from "@/components/projects";
import Resume from "@/components/resume";
import Skills from "@/components/skills";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Sidebar />

      <main id="main-content" className="pt-16 lg:ml-64 lg:pt-0">
        <Hero />

        <div className="mx-auto max-w-5xl space-y-24 px-6 py-16 md:px-12 lg:px-16">
          <Projects />
          <Skills />
          <About />
          <Resume />
          <Contact />
        </div>

        <footer className="border-t border-neutral-200 px-6 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <p>
            © {new Date().getFullYear()} {site.name}. Built with Next.js and
            Tailwind CSS.
          </p>
        </footer>
      </main>
    </div>
  );
}
