import type { HeroDetails } from "@/api/apis";
import CommunityHero from "../_components/community-hero";

const SystemsPage = () => {
    const systemsHero: HeroDetails = {
        title: "systems",
        description: "Low-level, high impact",
        secondDescription: "From compilers to operating systems, this community is all about performance, control, and a deeper understanding of how things work.",
        color: "systems"
    };

    return (
        <div className="page">
            <CommunityHero details={systemsHero} />
        </div>
    );
};

export default SystemsPage;
