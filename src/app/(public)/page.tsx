"use client";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";
import CommunitySection from "./landing-page/community-section";
import JoinSection from "./landing-page/join-section";
import MissionSection from "./landing-page/mission-section";
import TechStackSection from "./landing-page/tech-stack-section";
import { useIsMobile } from "@/state/observe/IsMobile";
import MobileLandingPage from "./landing-page/mobile-landing-page";
import CallToActionButtons from "./landing-page/call-to-action";

export default function HomePage() {
  const isMobile = useIsMobile();

  const clubHero: HeroDetails = {
    title: "Club",
    description:
      "A student-led innovation hub fostering growth in web, AI, systems, and app development.",
    secondDescription:
      "Join a team, learn from others, and build real things that make a difference.",
    color: "bright-yellow",
  };

  if (isMobile) {
    // 🟡 Fallback to normal stacked layout
    return (
      <>
        <MobileLandingPage details={clubHero} />
      </>
    );
  }

  // 🟢 Default parallax layout for larger screens
  return (
    <main className="flex-1 min-h-screen relative overflow-hidden text-text dark:text-text-inverted">
      <Parallax
        pages={5}
        className="absolute inset-0 w-full h-full no-scrollbar"
      >
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="h-screen flex flex-col gap-8 items-center justify-center">
            <CommunityHero details={clubHero} />
            <CallToActionButtons/>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.4}>
          <div className="flex items-center justify-center">
            <MissionSection />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.3}>
          <div className="flex items-center justify-center">
            <TechStackSection />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.25}>
          <div className="flex items-center justify-center">
            <CommunitySection />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={4} speed={0.2}>
          <div className="flex items-center justify-center">
            <JoinSection />
          </div>
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}
