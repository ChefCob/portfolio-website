"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { canonicalProjects } from "@/data/registry";
import {
  deriveOsintTree,
  type OsintDomainBranch,
} from "@/lib/intelligence/deriveTree";
import { Reveal } from "./Reveal";

export function CareerIntelligence() {
  const treeData: OsintDomainBranch[] = useMemo(
    () => deriveOsintTree(canonicalProjects),
    []
  );

  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({
    [treeData[0]?.id || ""]: true,
    [treeData[1]?.id || ""]: true,
    [treeData[2]?.id || ""]: true,
  });

  const [expandedMethods, setExpandedMethods] = useState<Record<string, boolean>>({
    [treeData[0]?.methodologies[0]?.id || ""]: true,
    [treeData[1]?.methodologies[0]?.id || ""]: true,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const toggleDomain = (id: string) => {
    setExpandedDomains((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMethod = (id: string) => {
    setExpandedMethods((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allDomains: Record<string, boolean> = {};
    const allMethods: Record<string, boolean> = {};
    treeData.forEach((d) => {
      allDomains[d.id] = true;
      d.methodologies.forEach((m) => {
        allMethods[m.id] = true;
      });
    });
    setExpandedDomains(allDomains);
    setExpandedMethods(allMethods);
  };

  const collapseAll = () => {
    setExpandedDomains({});
    setExpandedMethods({});
  };

  // Filtered Tree View
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return treeData;
    const q = searchQuery.toLowerCase();

    return treeData
      .map((domain) => {
        const matchesDomain =
          domain.title.toLowerCase().includes(q) ||
          domain.tagline.toLowerCase().includes(q);

        const filteredMethods = domain.methodologies.filter(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.technologies.some((t) => t.toLowerCase().includes(q)) ||
            m.deliverables.some(
              (d) =>
                d.title.toLowerCase().includes(q) ||
                d.technologies.some((t) => t.toLowerCase().includes(q))
            )
        );

        if (matchesDomain || filteredMethods.length > 0) {
          return {
            ...domain,
            methodologies: filteredMethods.length > 0 ? filteredMethods : domain.methodologies,
          };
        }
        return null;
      })
      .filter(Boolean) as OsintDomainBranch[];
  }, [treeData, searchQuery]);

  return (
    <section
      id="career-intelligence"
      className="scroll-mt-16 bg-background px-6 py-28 md:py-36 relative overflow-hidden"
      aria-label="Career Intelligence Matrix"
    >
      {/* Subtle Tactical Ambient Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[900px] rounded-full bg-[radial-gradient(circle,_rgba(225,29,72,0.05)_0%,_transparent_70%)] blur-3xl"
      />

      <div className="mx-auto max-w-5xl relative z-10">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0c12] px-4 py-1 font-mono text-[11px] uppercase tracking-wider text-rose-400 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              OSINT-STYLE CAPABILITY DIRECTORY
            </span>
            <h2 className="mt-4 text-[36px] font-bold tracking-tight text-foreground md:text-[52px] font-display">
              Career Intelligence Tree
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] text-muted leading-relaxed">
              Hierarchical intelligence graph mapping security domains, operational methodologies, and verified engineering deliverables.
            </p>
          </div>
        </Reveal>

        {/* Tree Control Bar: Search & Expand Controls */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-5">
          <div className="relative flex-1 max-w-md">
            <span aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-[12px] text-muted">
              ⌕
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search security capabilities, methodologies, or deliverables"
              placeholder="Search domains, methodologies, or deliverables..."
              className="w-full rounded-full border border-white/10 bg-[#08090e] pl-9 pr-4 py-2 text-[13px] text-foreground placeholder:text-muted focus:border-rose-500/60 focus:outline-none focus:ring-1 focus:ring-rose-500/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={expandAll}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] font-medium text-muted hover:border-white/20 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              [+] Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] font-medium text-muted hover:border-white/20 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              [−] Collapse All
            </button>
          </div>
        </div>

        {/* OSINT Tree Matrix Container */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#06070a]/95 p-6 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {filteredTree.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[14px] text-muted">
                No capabilities or methodologies matched &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 font-mono text-[12px] font-semibold text-rose-400 underline hover:text-rose-300"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTree.map((domain) => {
                const isDomainExpanded = Boolean(
                  expandedDomains[domain.id] || searchQuery.trim()
                );

                return (
                  <div
                    key={domain.id}
                    className="rounded-2xl border border-white/[0.07] bg-[#090b10] transition-all hover:border-white/15"
                  >
                    {/* Level 1: Domain Header (Accessible Semantic Button) */}
                    <button
                      type="button"
                      onClick={() => toggleDomain(domain.id)}
                      aria-expanded={isDomainExpanded}
                      aria-controls={`domain-panel-${domain.id}`}
                      className="flex w-full cursor-pointer items-center justify-between p-5 text-left select-none transition-colors hover:bg-white/[0.02] focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-2xl"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 font-mono text-[12px] font-bold text-rose-400">
                          {isDomainExpanded ? "−" : "+"}
                        </span>
                        <div>
                          <h3 className="text-[17px] font-bold text-foreground font-display">
                            {domain.title}
                          </h3>
                          <p className="font-mono text-[11px] text-muted">
                            {domain.tagline} • {domain.methodologies.length} core methodologies
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400/80 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                        DOMAIN
                      </span>
                    </button>

                    {/* Level 2: Methodologies Branch (OSINT Sub-Nodes) */}
                    {isDomainExpanded && (
                      <div
                        id={`domain-panel-${domain.id}`}
                        className="border-t border-white/[0.06] bg-[#07080d]/80 px-5 py-4 pl-8 sm:pl-12 space-y-4"
                      >
                        {domain.methodologies.map((method) => {
                          const isMethodExpanded = Boolean(
                            expandedMethods[method.id] || searchQuery.trim()
                          );

                          return (
                            <div
                              key={method.id}
                              className="relative border-l-2 border-white/[0.08] pl-5 transition-colors hover:border-rose-500/50"
                            >
                              {/* Branch connector node (Accessible button) */}
                              <button
                                type="button"
                                onClick={() => toggleMethod(method.id)}
                                aria-expanded={isMethodExpanded}
                                aria-controls={`method-panel-${method.id}`}
                                className="flex w-full cursor-pointer items-start justify-between py-1.5 text-left select-none group focus:outline-none focus:ring-1 focus:ring-rose-500 rounded"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[11px] text-rose-400">
                                      {isMethodExpanded ? "▼" : "▶"}
                                    </span>
                                    <h4 className="text-[15px] font-semibold text-foreground group-hover:text-rose-300 transition-colors font-display">
                                      {method.title}
                                    </h4>
                                  </div>
                                  <p className="text-[13px] leading-relaxed text-muted max-w-2xl">
                                    {method.description}
                                  </p>
                                </div>

                                <div className="hidden sm:flex items-center gap-1.5">
                                  {method.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="rounded bg-white/5 border border-white/5 px-2 py-0.5 font-mono text-[10px] text-muted"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </button>

                              {/* Level 3: Applied Deliverables (Leaf Nodes with Safe Routing) */}
                              {isMethodExpanded && (
                                <div
                                  id={`method-panel-${method.id}`}
                                  className="mt-3 pl-4 pt-2 space-y-2 border-l border-rose-500/20"
                                >
                                  {method.deliverables.map((deliverable) => (
                                    <div
                                      key={deliverable.id}
                                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0b0d14] p-4 transition-all hover:border-rose-500/40 hover:bg-[#0f121a]"
                                    >
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                          <span className="text-[14px] font-bold text-foreground font-display">
                                            {deliverable.title}
                                          </span>
                                          <span className="font-mono text-[10px] text-muted">
                                            ({deliverable.maturity})
                                          </span>
                                        </div>
                                        <p className="mt-0.5 text-[12px] text-muted">
                                          {deliverable.tagline}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-3 shrink-0">
                                        {deliverable.metrics && (
                                          <span className="font-mono text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
                                            {deliverable.metrics.value}
                                          </span>
                                        )}
                                        <Link
                                          href={deliverable.caseStudyUrl}
                                          aria-label={`Inspect evidence and architecture for ${deliverable.title}`}
                                          className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 font-mono text-[11px] font-semibold text-rose-300 hover:bg-rose-500 hover:text-white transition-all shadow-xs"
                                        >
                                          {deliverable.hasDetailView
                                            ? "Inspect Evidence ↗"
                                            : "View Overview ↗"}
                                        </Link>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
