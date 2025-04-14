import { FaDiscord, FaLinkedin, FaInstagram } from "react-icons/fa";

const departments = [
  "General",
  "Web",
  "AI",
  "Games",
  "Systems",
  "App",
  "Automation",
  "VR/AR",
  "Hackathon",
];

const socialLinks = [
  {
    name: "Discord",
    href: "https://discord.com/invite/q9gk2MasBC",
    icon: FaDiscord,
    className: "text-web",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/developer-club-wmu/",
    icon: FaLinkedin,
    className: "text-systems",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/developerclubwmu",
    icon: FaInstagram,
    className: "text-games",
  },
];

const fieldStyles = {
  name: {
    bg: "bg-[#0C162D]",
    border: "border-web",
    ring: "focus:ring-web",
  },
  email: {
    bg: "bg-[#0D1E1D]",
    border: "border-ai",
    ring: "focus:ring-ai",
  },
  department: {
    bg: "bg-[#2B140D]",
    border: "border-app",
    ring: "focus:ring-app",
  },
  message: {
    bg: "bg-[#2B140D]",
    border: "border-app",
    ring: "focus:ring-app",
  },
};

const ContactPage = () => {
  return (
    <div className="info-page">
      <div className="text-text dark:text-text-inverted flex flex-col items-center gap-3 text-4xl font-black md:text-6xl lg:text-7xl xl:text-8xl">
        <h1 className="mb-10 [letter-spacing:-.05em] uppercase">
          <span>Contact </span>
          <span
            className="text-bright-yellow inline-block bg-gradient-to-r bg-clip-text text-transparent"
            style={{ fontWeight: "bold" }}
          >
            Us
          </span>
        </h1>
      </div>

      <div className="text-text dark:text-text-inverted flex flex-col items-center px-4 sm:px-6 md:px-10">
        <h2 className="max-w-md text-2xl font-bold [letter-spacing:-.05em] md:text-3xl lg:max-w-2xl lg:text-5xl">
          📬 Reach Out
        </h2>
        <p className="mt-5 mb-10 text-base leading-relaxed opacity-90 sm:text-lg md:text-xl lg:max-w-[600px]">
          Interested in joining the club, have a question, an idea, or want to
          collaborate — or even just want to drop a hi? Let us know what you're
          thinking, and we'll make sure it reaches the right team.
        </p>

        <form className="w-full max-w-xl space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`rounded-lg border ${fieldStyles.name.border} ${fieldStyles.name.bg} text-text-inverted p-3 ${fieldStyles.name.ring}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`rounded-lg border ${fieldStyles.email.border} ${fieldStyles.email.bg} text-text-inverted p-3 ${fieldStyles.email.ring}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="department" className="text-base font-medium">
              Department
            </label>
            <select
              id="department"
              className={`rounded-lg border ${fieldStyles.department.border} ${fieldStyles.department.bg} text-text-inverted p-3 ${fieldStyles.department.ring}`}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept.toLowerCase()}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-base font-medium">
              Your Question / Message
            </label>
            <textarea
              id="message"
              rows={5}
              className={`rounded-lg border ${fieldStyles.message.border} ${fieldStyles.message.bg} text-text-inverted p-3 ${fieldStyles.message.ring}`}
            />
          </div>

          <button
            type="submit"
            className="from-light-yellow to-bright-yellow text-text rounded-xl bg-gradient-to-r px-6 py-3 font-semibold shadow-md transition hover:brightness-110"
          >
            Send
          </button>
        </form>

        <div className="mt-16 text-center">
          <h2 className="mb-2 text-2xl font-semibold">Connect With Us</h2>
          <p className="mb-4 text-lg opacity-80">
            Hop into our Discord and follow us on socials to stay in the loop
            with events, projects, and all the exciting things happening in the
            club.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map(({ name, href, icon: Icon, className }) => (
              <a
                key={name}
                href={href}
                className={`${className} hover:opacity-80`}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
              >
                <Icon size={35} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
