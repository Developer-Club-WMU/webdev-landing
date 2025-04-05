import type { HeroDetails } from "@/api/apis";
import CommunityHero from "../_components/community-hero";

const AIPage = () => {
    const aiHero: HeroDetails = {
        title: "AI",
        description: "Explore the Intelligence of Tomorrow",
        secondDescription: "We dive into machine learning, large language models, and AI-powered systems that solve real-world problems.",
        color: "ai"
    };
    return (
        <div className="page">
            <CommunityHero details={aiHero}/>
        </div>
    )
}

export default AIPage;
