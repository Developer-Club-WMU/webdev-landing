import type { HeroDetails } from "@/api/apis";

interface TextSizes {
    title: string;
    description: string;
    secondDescription: string;
}

const textSizes: TextSizes = {
    title: "text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase",
    description: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    secondDescription: "text-lg md:text-2xl lg:text-3xl xl:text-4xl",
};

const CommunityHero = ({ details }: { details: HeroDetails }) => {
    return (
        <div className="font-black flex flex-col gap-2 items-center text-text dark:text-text-inverted text-center">
            <h1 className={`[letter-spacing:-.05em] ${textSizes.title}`}>
                <span>Developer </span>
                <span
                    className="inline-block leading-snug text-transparent bg-clip-text bg-gradient-to-r"
                    style={{
                        color: `var(--color-${details.color})`,
                        fontWeight: "bold",
                    }}
                >
                    {details.title}
                </span>
            </h1>
            <h2
                className={`font-bold max-w-md md:max-w-xl lg:max-w-2xl [letter-spacing:-.05em] ${textSizes.description}`}
            >
                {details.description}
            </h2>
            <p
                className={`opacity-90 max-w-[500px] mt-8 lg:max-w-[600px] ${textSizes.secondDescription}`}
            >
                {details.secondDescription}
            </p>
        </div>
    );
};

export default CommunityHero;