import type { HeroDetails } from "@/api/apis";

const CommunityHero = ({ details }: { details: HeroDetails }) => {
    return (
        <div className="font-black flex flex-col gap-3 items-center text-text dark:text-text-inverted text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase">
            <h1 className="[letter-spacing:-.05em]">
                <span>
                    Developer {" "}
                </span>
                <span
                    className={`inline-block leading-snug text-transparent bg-clip-text bg-gradient-to-r`}
                    style={{
                        color: `var(--color-${details.color})`,
                        fontWeight: "bold",
                    }}
                >
                    {details.title}
                </span>
            </h1>
            <h2 className="font-bold text-2xl max-w-md md:text-3xl lg:text-5xl lg:max-w-2xl text-center [letter-spacing:-.05em]">
                {details.description}
            </h2>
            <p className="text opacity-90 max-w-[500px] text-4xl md:text-6xl lg:text-xl lg:max-w-[600px] text-center"> 
                {details.secondDescription}
            </p>
        </div>
    )
}

export default CommunityHero;
