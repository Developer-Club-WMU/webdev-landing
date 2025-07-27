import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

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
    </div>
  );
};

export default HackathonPage;
