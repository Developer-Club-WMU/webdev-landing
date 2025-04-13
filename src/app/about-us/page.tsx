interface GoalCardProps {
  icon: string;
  title: string;
  text: string;
  borderColor: string;
  bgColor: string;
}

interface CommonSectionProps {
  subtitle: string;
  description: string;
}

const sectionTitleClass =
  "max-w-md text-2xl font-bold [letter-spacing:-.05em] md:text-3xl lg:max-w-2xl lg:text-5xl";

const sectionParagraphClass =
  "text mt-5 mb-10 max-w-[90vw] text-base leading-relaxed font-normal opacity-90 sm:text-lg md:text-xl lg:max-w-[600px]";

const goals = [
  {
    icon: "💡",
    title: "Build Real Projects",
    text: "Launch apps, websites, and AI tools that make a difference.",
    borderColor: "border-blue-400",
    bgColor: "bg-[#0C162D]",
  },
  {
    icon: "🪐",
    title: "Learn & Grow Together",
    text: "Host workshops, hackathons & mentoring sessions to boost your skills.",
    borderColor: "border-teal-400",
    bgColor: "bg-[#0D1E1D]",
  },
  {
    icon: "🌐",
    title: "Connect & Collaborate",
    text: "Network with fellow devs, alumni, and industry pros.",
    borderColor: "border-orange-400",
    bgColor: "bg-[#2B140D]",
  },
];

const audienceList = [
  {
    dot: "bg-blue-400",
    text: (
      <>
        Anyone curious about <span className="text-cyan-400">web</span>,{" "}
        <span className="text-orange-400">AI</span>, or app development
      </>
    ),
  },
  {
    dot: "bg-teal-400",
    text: (
      <>
        Beginners looking to <span className="text-orange-400">learn</span> by
        doing
      </>
    ),
  },
  {
    dot: "bg-yellow-400",
    text: (
      <>
        Experienced devs ready to <span className="text-orange-400">lead</span>{" "}
        or mentor
      </>
    ),
  },
  {
    dot: "bg-yellow-400",
    text: (
      <>
        Students from <span className="text-cyan-400">any</span> major (not just
        CS)
      </>
    ),
  },
];

const GoalCard: React.FC<GoalCardProps> = ({
  icon,
  title,
  text,
  borderColor,
  bgColor,
}) => (
  <div
    className={`flex flex-col justify-between rounded-2xl border ${borderColor} ${bgColor} p-5 text-white shadow-md md:w-80`}
  >
    <h3 className="mb-2 text-xl font-semibold">
      {icon} {title}
    </h3>
    <p className="text-base font-normal opacity-90">{text}</p>
  </div>
);

const TargetAudienceList = () => (
  <>
    <h2 className={sectionTitleClass}>👩‍💻 Who’s This Club For?</h2>
    <ul className="mt-5 mb-10 space-y-4 text-lg font-normal text-white opacity-90 lg:text-xl">
      {audienceList.map(({ dot, text }, idx) => (
        <li key={idx} className="flex items-center gap-3">
          <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  </>
);

const CommonSection: React.FC<CommonSectionProps> = ({
  subtitle,
  description,
}) => (
  <>
    <h2 className={sectionTitleClass}>{subtitle}</h2>
    <p className={sectionParagraphClass}>{description}</p>
  </>
);

const AboutUsPage = () => {
  const missionDetails = {
    subtitle: "🔥 Our Mission",
    description:
      "A student-led innovation hub on a mission to empower tech enthusiasts to grow through collaboration, creativity, and real-world development experience.",
  };

  const originStory = {
    subtitle: "📖 Our Origin Story",
    description:
      "A few curious students at Western Michigan University came together with a shared passion for tech and a dream to build cool stuff. What started as casual coding sessions turned into a thriving community of developers pushing boundaries in Web, AI, and App development.",
  };

  return (
    <div className="info-page">
      <h1 className="mb-1 font-bold">About Us</h1>
      <div className="text-text dark:text-text-inverted flex flex-col items-center gap-3 text-4xl font-black md:text-6xl lg:text-7xl xl:text-8xl">
        <h1 className="mb-10 [letter-spacing:-.05em] uppercase">
          <span>About The </span>
          <span
            className="inline-block bg-gradient-to-r bg-clip-text leading-snug text-transparent"
            style={{
              color: "var(--color-bright-yellow)",
              fontWeight: "bold",
            }}
          >
            Club
          </span>
        </h1>

        <div className="px-4 sm:px-6 md:px-10">
          {/* Mission Section */}
          <CommonSection
            description={missionDetails.description}
            subtitle={missionDetails.subtitle}
          />

          {/* Goals Section */}
          <h2 className={sectionTitleClass}>🚀 Our Goals</h2>
          <div className="mt-5 mb-10 flex flex-col items-stretch gap-6 md:flex-row md:justify-center md:gap-4">
            {goals.map((goal, idx) => (
              <GoalCard key={idx} {...goal} />
            ))}
          </div>

          {/* Origin Story */}
          <CommonSection
            description={originStory.description}
            subtitle={originStory.subtitle}
          />

          {/* Audience */}
          <TargetAudienceList />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
