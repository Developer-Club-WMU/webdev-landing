import CommunityDetails from "@/features/public/CommunityDetails/CommunityDetails";
import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

const content = {
  header: "APP",
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
    discord: "https://discord.com/invite/G9yE5s6NFM",
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

const appsHero: HeroDetails = {
  title: "App",
  description: "iOS, Android, cross-platform",
  secondDescription:
    "We focus on user experience and high-quality app development workflows.",
  color: "app",
};

const AppPage = () => {
  return (
    <div className="page">
      <CommunityHero details={appsHero} />
      <CommunityDetails content={content} />
    </div>
  );
};

export default AppPage;
