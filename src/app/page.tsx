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
    <div className="min-h-screen bg-stone-50 text-slate-950 dark:bg-slate-950 dark:text-stone-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Sidebar />

      <main id="main-content" className="pt-16 lg:ml-72 lg:pt-0">
        <Hero />

        <div className="mx-auto max-w-6xl space-y-28 px-6 py-20 md:px-10 lg:px-14 xl:px-20">
          <About />
          <Skills />
          <Resume />
          <Projects />
          <Contact />
        </div>

        <footer className="border-t border-slate-200 px-6 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {site.name}. Built with Next.js and
            Tailwind CSS.
          </p>
        </footer>
      </main>
    </div>
  );
}
