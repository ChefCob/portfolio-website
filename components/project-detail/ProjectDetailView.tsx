"use client";

import { useState } from "react";
import type { DetailedProjectRecord } from "@/types/projectDetail";
import type { EvidenceArtifact } from "@/types/evidence";
import { ProjectDetailHero } from "./ProjectDetailHero";
import { SubsystemGrid } from "./SubsystemGrid";
import { CapabilityMatrixTable } from "./CapabilityMatrixTable";
import { LimitationsCallout } from "./LimitationsCallout";
import { ArtifactCard } from "@/components/evidence/ArtifactCard";
import { EvidenceDrawer } from "@/components/evidence/EvidenceDrawer";

interface ProjectDetailViewProps {
  project: DetailedProjectRecord;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [selectedArtifact, setSelectedArtifact] =
    useState<EvidenceArtifact | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <ProjectDetailHero project={project} />

      {/* Main Content Container */}
      <div className="mx-auto max-w-5xl px-6 space-y-10">
        {/* Problem & Solution Context */}
        <section className="pt-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#08090e]/90 p-7 backdrop-blur-xl shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-400">
                PROBLEM STATEMENT & THREAT CONTEXT
              </span>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {project.problemStatement}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#08090e]/90 p-7 backdrop-blur-xl shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-400">
                ARCHITECTURAL SOLUTION
              </span>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {project.solutionOverview}
              </p>
            </div>
          </div>
        </section>

        {/* Subsystem Architecture Grid */}
        <SubsystemGrid subsystems={project.subsystems} />

        {/* Governed Capability & Verification Matrix */}
        <CapabilityMatrixTable
          claims={project.capabilityClaims}
          evidence={project.evidence}
          onInspectEvidence={(artifact) => setSelectedArtifact(artifact)}
        />

        {/* Evidence Artifacts Gallery */}
        <section className="py-6">
          <div className="mb-6">
            <h2 className="text-[24px] font-bold tracking-tight text-foreground md:text-[30px] font-display">
              Verifiable Evidence Artifacts
            </h2>
            <p className="mt-1 text-[14px] text-muted">
              Concrete PCAP captures, execution telemetry logs, physical hardware
              photographs, and verification audits.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {project.evidence.map((artifact) => (
              <ArtifactCard
                key={artifact.id}
                artifact={artifact}
                onInspect={(art) => setSelectedArtifact(art)}
              />
            ))}
          </div>
        </section>

        {/* Known Limitations & Trade-offs */}
        <LimitationsCallout
          limitations={project.governedLimitations}
          engineeringDecisions={project.engineeringDecisions}
        />
      </div>

      {/* Slide-over Evidence Drawer */}
      <EvidenceDrawer
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />
    </div>
  );
}
