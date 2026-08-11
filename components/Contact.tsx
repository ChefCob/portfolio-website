import { profile } from "@/data/profile";
import { AppleLink } from "./AppleLink";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-12 bg-[#1d1d1f] px-6 py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-[980px] text-center">
        <Reveal>
          <h2 className="text-[32px] font-semibold tracking-tight md:text-[48px]">
            Let&apos;s connect.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/60">
            Open to full-time roles, contract engagements, and security
            consulting opportunities.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <AppleLink href={`mailto:${profile.email}`} light>
              {profile.email}
            </AppleLink>
            <AppleLink href={profile.links.linkedin} external light>
              LinkedIn
            </AppleLink>
            <AppleLink href={profile.links.github} external light>
              GitHub
            </AppleLink>
            <AppleLink href={profile.links.resume} light>
              Resume
            </AppleLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
