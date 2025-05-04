import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

const WebPage = () => {

    const webHero: HeroDetails = {
        title: "web",
        description: "From React to full-stack TypeScript",
        secondDescription: "We craft modern, performant, and accessible web experiences using the latest in frontend and backend technologies.",
        color: "web"
    };
    return (
        <div className="page">
            <CommunityHero details={webHero}/>
        </div>
    )
}

export default WebPage;
