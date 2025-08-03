import CommunityDetails from "@/features/public/CommunityDetails/CommunityDetails";
import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

const content = {
  header: "Hackathon",
  description: {
    main: "A relaxed but driven space for WMU students who love hackathons, tech conferences, and coding challenges.",
    sub: "Whether you’re grinding LeetCode, hunting for teammates, or just curious about your first event, jump in to swap ideas, get feedback, and push each other to level-up. All majors and skill levels welcome, if you like building cool things under pressure, this is your crew.",
  },
  technologies: {
    languages: ["JavaScript", "Dart", "Swift", "Kotlin", "Python", "C++"],
    frameworks: [
      "React",
      "Next.js",
      "Flutter",
      "AR/VR frameworks",
      "Minecraft modding",
    ],
  },
  meetingInfo: "TBA; Currently Online over summer",
  teamLeads: ["Cody Thornell", "Anirudh Kadapa"],
  contact: {
    email: "cody.g.thornell@wmich.edu",
    discord: "https://discord.gg/R9ewFdGa",
    // github: "https://github.com/Hackathon-Team-WMU",
  },
  tags: [
    "hackathon",
    "challenge",
    "competition",
    "leetcode",
    "problem solving",
    "wmich",
    "western michigan university",
    "dev club",
    "dev club wmu",
    "coding",
    "tech conferences",
  ],
};

const HackathonPage = () => {
  const hackathonHero: HeroDetails = {
    title: "hackathon",
    description: "Build fast. Learn faster.",
    secondDescription:
      "Our hackathon community is fueled by collaboration, caffeine, and code. Whether it’s your first sprint or tenth build battle, you’ll find energy, mentorship, and momentum here.",
    color: "hackathon",
  };

  return (
    <div className="page">
      <CommunityHero details={hackathonHero} />
      <CommunityDetails content={content} />
    </div>
  );
};

export default HackathonPage;
