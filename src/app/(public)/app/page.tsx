import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

const AppPage = () => {
    const appsHero: HeroDetails = {
        title: "App",
        description: "iOS, Android, cross-platform",
        secondDescription: "We focus on user experience and high-quality app development workflows.",
        color: "app"
    };
    return (
        <div className="page">
            <CommunityHero details={appsHero}/>
        </div>
    )
}

export default AppPage;
