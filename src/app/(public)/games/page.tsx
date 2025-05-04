import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

const GamesPage = () => {
    const gamesHero: HeroDetails = {
        title: "games",
        description: "Design meets playability",
        secondDescription: "Whether you're building 2D pixel art or 3D multiplayer worlds, our game community thrives on innovation, engines, and creativity.",
        color: "games"
    };

    return (
        <div className="page">
            <CommunityHero details={gamesHero} />
        </div>
    );
};

export default GamesPage;
