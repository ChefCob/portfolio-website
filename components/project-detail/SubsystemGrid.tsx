import type { SubsystemComponent } from "@/types/projectDetail";

interface SubsystemGridProps {
  subsystems: SubsystemComponent[];
}

export function SubsystemGrid({ subsystems }: SubsystemGridProps) {
  // Group subsystems dynamically by execution tier
  const tierGroups = subsystems.reduce<Record<string, SubsystemComponent[]>>(
    (acc, sub) => {
      const tier = sub.executionTier || "host_python";
      if (!acc[tier]) acc[tier] = [];
      acc[tier].push(sub);
      return acc;
    },
    {}
  );

  const getTierHeading = (tierKey: string) => {
    switch (tierKey) {
      case "embedded_firmware":
        return "Embedded Firmware Runtime Tier";
      case "cloud_service":
        return "Cloud & Service Gateway Tier";
      default:
        return "Host Processing & Core Engine Tier";
    }
  };

  const getTierBadge = (tierKey: string) => {
    switch (tierKey) {
      case "embedded_firmware":
        return "Bare-Metal Firmware";
      case "cloud_service":
        return "Cloud Service";
      default:
        return "Host Python";
    }
  };

  const getTierColor = (index: number) => {
    const colors = [
      { text: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10", hover: "hover:border-rose-500/40" },
      { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", hover: "hover:border-emerald-500/40" },
      { text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10", hover: "hover:border-amber-500/40" },
      { text: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10", hover: "hover:border-blue-500/40" },
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-6">
      <div className="mb-8">
        <h2 className="text-[24px] font-bold tracking-tight text-foreground md:text-[30px] font-display">
          System Architecture & Subsystems
        </h2>
        <p className="mt-1 text-[14px] text-muted">
          Decoupled subsystem pipeline organizing ingestion, cryptographic verification, and hardware/runtime telemetry.
        </p>
      </div>

      <div className="space-y-10">
        {Object.entries(tierGroups).map(([tierKey, items], tierIdx) => {
          const style = getTierColor(tierIdx);

          return (
            <div key={tierKey}>
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className={`flex size-6 items-center justify-center rounded-full ${style.bg} ${style.border} border font-mono text-[11px] font-bold ${style.text}`}
                >
                  {tierIdx + 1}
                </span>
                <h3 className="text-[17px] font-semibold text-foreground font-display">
                  Tier {tierIdx + 1}: {getTierHeading(tierKey)}
                </h3>
              </div>

              <div
                className={`grid gap-4 ${
                  items.length === 1
                    ? "grid-cols-1"
                    : items.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-3"
                }`}
              >
                {items.map((subsystem) => (
                  <div
                    key={subsystem.name}
                    className={`flex flex-col justify-between rounded-2xl border border-white/10 bg-[#08090e]/90 p-5 backdrop-blur-xl transition-colors ${style.hover}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
                          {subsystem.tagline}
                        </span>
                        <span className="rounded bg-white/5 border border-white/5 px-2 py-0.5 font-mono text-[10px] text-muted">
                          {getTierBadge(subsystem.executionTier)}
                        </span>
                      </div>

                      <h4 className="mt-2 text-[15px] font-bold text-foreground font-display">
                        {subsystem.name}
                      </h4>

                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        {subsystem.description}
                      </p>

                      <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3">
                        <span className="block font-mono text-[10px] font-semibold uppercase text-muted">
                          Key Responsibilities:
                        </span>
                        <ul className="space-y-1 text-[12px] text-muted">
                          {subsystem.responsibilities.map((resp) => (
                            <li key={resp} className="flex items-start gap-1.5">
                              <span className={style.text}>•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-3">
                      {subsystem.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-white/5 border border-white/5 px-2 py-0.5 font-mono text-[10px] text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
