import { createFileRoute } from "@tanstack/react-router";
import { SlidePresentation } from "@/components/ui-fg/SlidePresentation";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ObjectivesSection } from "@/components/sections/ObjectivesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { AgentSection } from "@/components/sections/AgentSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { TechSection } from "@/components/sections/TechSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "FUTURE GRID — Predictive AI Society Simulation" },
      { name: "description", content: "Full presentation: 500 AI agents, 9 economic classes, 3-tier AI brain. Built by Team 9-ELEVEN." },
      { property: "og:title", content: "FUTURE GRID — The Simulation" },
      { property: "og:description", content: "500 AI agents · 9 economic classes · 3-tier AI brain. Simulate reality before you ship." },
    ],
  }),
  component: Simulation,
});

const SLIDES = [
  <ProblemSection key="problem" />,
  <ObjectivesSection key="objectives" />,
  <SolutionSection key="solution" />,
  <HowItWorksSection key="how" />,
  <ClassesSection key="classes" />,
  <AgentSection key="agents" />,
  <DemoSection key="demo" />,
  <TechSection key="tech" />,
  <ImpactSection key="impact" />,
  <UseCasesSection key="usecases" />,
  <TeamSection key="team" />,
  <CTASection key="cta" />,
];

function Simulation() {
  return <SlidePresentation slides={SLIDES} />;
}
