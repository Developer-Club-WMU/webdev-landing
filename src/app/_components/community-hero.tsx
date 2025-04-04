import type { HeroDetails } from "@/api/apis";

const CommunityHero = ({ details }: { details: HeroDetails }) => {
    return (
        <div className="font-black flex flex-col gap-3 items-center text-text dark:text-text-inverted text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em]">
            <h1>
                <span>Developer</span>
                <span className="inline-block leading-snug text-transparent bg-clip-text bg-gradient-to-r from-web to-blue-300">
                    {details.title}
                </span>
            </h1>
            <h2 className="font-bold text-2xl max-w-md md:text-3xl lg:text-5xl lg:max-w-2xl text-center">
                {details.description}
            </h2>
        </div>
    )
}

export default CommunityHero;
