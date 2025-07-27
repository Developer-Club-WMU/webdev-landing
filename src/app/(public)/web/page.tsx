import CommunityDetails from "@/features/public/CommunityDetails/CommunityDetails";

const content = {
  header: "WEB",
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

const WebPage = () => {
  return <CommunityDetails content={content} />;
};

export default WebPage;
