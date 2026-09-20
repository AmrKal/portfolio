import Image from "next/image";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <Image
        src={site.profileImage}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) calc(100vw - 16rem), 100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/30 to-black/10 p-8">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight drop-shadow sm:text-5xl md:text-6xl">
            {site.name}
          </h1>
          <p className="mt-2 text-lg text-neutral-200 sm:text-xl md:text-2xl">
            {site.role}
          </p>
        </div>
      </div>
    </div>
  );
}
