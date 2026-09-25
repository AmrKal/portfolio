import Image from "next/image";
import { ArrowDownRight, Download, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 opacity-80 [background-image:radial-gradient(circle_at_15%_20%,rgba(45,212,191,.17),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,.12),transparent_35%)]" />
      <div className="mx-auto grid min-h-[760px] max-w-6xl items-center gap-14 px-6 py-20 md:px-10 lg:min-h-screen lg:grid-cols-[1.18fr_.82fr] lg:px-14 xl:px-20">
        <div>
          <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
            <span className="h-px w-10 bg-teal-300" />
            Building reliable systems
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-0.05em] sm:text-6xl xl:text-7xl">
            Backend engineering with a product mindset.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            I&rsquo;m {site.name}, a {site.role.toLowerCase()} building Python APIs,
            data pipelines and automation tools&mdash;with full-stack delivery and
            hands-on QA experience in financial software.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="h-4 w-4 text-teal-300" aria-hidden="true" />
            {site.location}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              See selected work
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={site.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-200"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
          <div className="absolute -inset-4 rotate-3 rounded-[2rem] border border-teal-300/20 bg-teal-300/5" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-3 shadow-2xl shadow-black/40">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem]">
              <Image
                src={site.profileImage}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 380px, 80vw"
                className="object-cover object-[center_30%]"
              />
            </div>
            <div className="absolute inset-x-7 bottom-7 rounded-2xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-teal-300">
                Current focus
              </p>
              <p className="mt-1 font-medium">{site.specialty}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
