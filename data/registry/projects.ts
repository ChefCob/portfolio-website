import type { CanonicalProject } from "@/types/registry";
import { piSnifferDetailRecord } from "./piSnifferDetail";
import { organDonationDetailRecord } from "./organDonationDetail";
import { agentSocDetailRecord } from "./agentSocDetail";

export const canonicalProjects: CanonicalProject[] = [
  piSnifferDetailRecord,
  organDonationDetailRecord,
  agentSocDetailRecord,
];
