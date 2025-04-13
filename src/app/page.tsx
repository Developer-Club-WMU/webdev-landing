import type { HeroDetails } from "@/api/apis";
import CommunityHero from "./_components/community-hero";
import ThemeColorShowcase from "./_components/theme-showcase";

export default function HomePage() {
    const clubHero: HeroDetails = {
        title: "Club",
        description: "A student-led innovation hub fostering growth in web, AI, systems, and app development.",
        secondDescription: "Join a team, learn from others, and build real things that make a difference.",
        color: "bright-yellow"
    };
    return (
        <main className="page">
            <CommunityHero details={clubHero}/>
        </main>
    );
}
