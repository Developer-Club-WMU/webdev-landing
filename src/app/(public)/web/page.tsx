import CommunityDetails from "@/features/public/CommunityDetails/CommunityDetails";
import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

const content = {
  header: "WEB",
  description: {
    main: "We are a passionate community focused on building modern, responsive, and scalable web applications.",
    sub: "Whether you’re just learning HTML/CSS or deploying full-stack projects with React and Next.js, there’s a place for you here. Join us for collaborative coding sessions, mini-projects, and real-world challenges that help sharpen your frontend and backend skills—from APIs to animations, authentication, databases, and beyond.",
  },
  technologies: {
    languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
    frameworks: ["React", "Next.js", "Node.js", "Tailwind CSS"],
  },
  meetingInfo: "TBD time/day @ Parkview Campus break room",
  teamLeads: [
    "Julio Flores",
    "Benwin George",
    "Shaga Sresthaa",
    "Arriza F. Wibowo",
  ],
  contact: {
    email: "julio.c.florescercado@wmich.edu",
    discord: "https://discord.gg/R9ewFdGa",
  },
  tags: [
    "web",
    "frontend",
    "backend",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "express",
    "html",
    "css",
    "tailwind",
    "fullstack",
    "web development",
  ],
};

const webHero: HeroDetails = {
  title: "web",
  description: "From React to full-stack TypeScript",
  secondDescription:
    "We craft modern, performant, and accessible web experiences using the latest in frontend and backend technologies.",
  color: "web",
};

const WebPage = () => {
  return (
    <div className="page">
      <CommunityHero details={webHero} />
      <CommunityDetails content={content} />
    </div>
  );
};

export default WebPage;
