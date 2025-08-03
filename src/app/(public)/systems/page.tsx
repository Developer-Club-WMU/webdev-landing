import CommunityDetails from "@/features/public/CommunityDetails/CommunityDetails";
import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

const systemsHero: HeroDetails = {
  title: "systems",
  description: "Low-level, high impact",
  secondDescription:
    "From compilers to operating systems, this community is all about performance, control, and a deeper understanding of how things work.",
  color: "systems",
};

const content = {
  header: "SYSTEMS",
  description: {
    main: "We are a community dedicated to helping Developer Club members explore mobile-first application development.",
    sub: "Whether you're a complete beginner or already building apps, we have something for you, starting with challenges at our coding meetups and progressing to advanced features like camera access, animations, GPS, maps, and graphing.",
  },
  technologies: {
    languages: ["Dart", "JavaScript", "Swift", "Kotlin"],
    frameworks: ["Flutter", "React Native", "Swift UI", "Springboot"],
  },
  meetingInfo: "TBD time/day @ Parkview Campus break room",
  teamLeads: ["Khang Nguyen", "Jordan Johnson"],
  contact: {
    email: "dsy1090@wmich.edu",
    discord: "https://discord.gg/R9ewFdGa",
  },
  tags: [
    "app",
    "frontend",
    "dart",
    "flutter",
    "javascript",
    "reactnative",
    "swift",
    "swiftui",
    "kotlin",
    "springboot",
  ],
};

const SystemsPage = () => {
  return (
    <div className="page">
      <CommunityHero details={systemsHero} />
      <CommunityDetails content={content} />
    </div>
  );
};

export default SystemsPage;
