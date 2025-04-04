import type { HeroDetails } from "@/api/apis";
import CommunityHero from "./_components/community-hero";
import ThemeColorShowcase from "./_components/theme-showcase";

export default function HomePage() {
    const details: HeroDetails = {
        title: "Club",
        description: "Describes what the clubs aims to do snippet"
    }
    return (
        <main className="flex flex-col w-full gap-20 md:gap-32 py-32 bg-bg dark:bg-bg-inverted">
            <CommunityHero details={details}/>
            <ThemeColorShowcase/>
        </main>
    );
}
