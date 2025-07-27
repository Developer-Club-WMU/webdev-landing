import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import CommunitySection from "./community-section";
import JoinSection from "./join-section";
import MissionSection from "./mission-section";
import TechStackSection from "./tech-stack-section";
import type { HeroDetails } from "@/models";

const MobileLandingPage = ({ details }: { details: HeroDetails }) => {
  return (
    <main className="flex flex-col gap-12">
      <div className="h-screen flex justify-center items-center pb-24">
        <CommunityHero details={details} />
      </div>
      <MissionSection />
      <TechStackSection />
      <CommunitySection />
      <JoinSection />
    </main>
  );
};

export default MobileLandingPage;
