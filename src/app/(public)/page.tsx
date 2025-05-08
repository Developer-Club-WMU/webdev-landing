import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

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
