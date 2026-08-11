import { profile } from "@/data/profile";
import { AppleLink } from "./AppleLink";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-12 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#e8f0fe_0%,_transparent_60%)]"
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute top-1/3 size-[420px] rounded-full bg-gradient-to-br from-blue-100/60 to-emerald-100/40 blur-3xl"
      />

      <p className="animate-hero relative text-[17px] font-medium text-muted">
        {profile.role}
      </p>

      <h1 className="animate-hero-delay-1 relative mt-2 max-w-4xl text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[56px] md:text-[72px]">
        {profile.headline.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>

      <p className="animate-hero-delay-2 relative mt-6 max-w-xl text-[19px] leading-relaxed text-muted md:text-[21px]">
        {profile.tagline}
      </p>

      <div className="animate-hero-delay-3 relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <AppleLink href="#projects">View projects</AppleLink>
        <AppleLink href={profile.links.resume}>Download resume</AppleLink>
        <AppleLink href="#contact">Contact</AppleLink>
      </div>

      <p className="animate-hero-delay-3 relative mt-16 text-[14px] text-muted">
        {profile.availability} · {profile.location}
      </p>
    </section>
  );
}
