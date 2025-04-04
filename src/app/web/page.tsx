import type { HeroDetails } from "@/api/apis";
import CommunityHero from "../_components/community-hero";

const WebPage = () => {
    const details: HeroDetails = {
        title: "Web",
        description: "Short description that describes the community that is interested in web development"
    };
    return (
        <div className="flex flex-col w-full gap-20 md:gap-32 py-32 bg-bg dark:bg-bg-inverted">
            <CommunityHero details={details}/>
        </div>
    )
}

export default WebPage;
