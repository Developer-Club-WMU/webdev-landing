import type { HeroDetails } from "@/models";
import { textSizes } from "./community-hero.config";

const CommunityHero = ({ details }: { details: HeroDetails }) => {
  return (
    <div className="text-text dark:text-text-inverted flex flex-col items-center gap-2 text-center font-black">
      <h1 className={`[letter-spacing:-.05em] ${textSizes.title}`}>
        <span>Developer </span>
        <span
          className="inline-block bg-gradient-to-r bg-clip-text leading-snug text-transparent"
          style={{
            color: `var(--color-${details.color})`,
            fontWeight: "bold",
          }}
        >
          {details.title}
        </span>
      </h1>
      <h2
        className={`max-w-md font-bold [letter-spacing:-.05em] md:max-w-xl lg:max-w-2xl ${textSizes.description}`}
      >
        {details.description}
      </h2>
      <p
        className={`mt-8 max-w-[500px] opacity-90 lg:max-w-[600px] ${textSizes.secondDescription}`}
      >
        {details.secondDescription}
      </p>
    </div>
  );
};

export default CommunityHero;
