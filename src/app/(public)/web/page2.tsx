const WebPage = () => {
  const content = {
    header: "APP",
    description: {
      main: "We are a community dedicated to helping Developer Club members explore mobile-first application development.",
      sub: "Whether you're a complete beginner or already building apps, we have something for you, starting with challenges at our coding meetups and progressing to advanced features like camera access, animations, GPS, maps, and graphing.",
    },
    technologies: {
      languages: ["Dart", "JavaScript", "Swift", "Kotlin"],
      frameworks: ["Flutter", "React Native", "Swift UI", "Springboot"],
    },
    meetingInfo: "TBD time/day @ Parkview Campus break room",
    teamLeads: ["Khang Nguyen", "Jordan Johnson"],
    contact: {
      email: "dsy1090@wmich.edu",
      discord: "https://discord.gg/R9ewFdGa",
    },
    tags: [
      "app",
      "frontend",
      "dart",
      "flutter",
      "javascript",
      "reactnative",
      "swift",
      "swiftui",
      "kotlin",
      "springboot",
    ],
  };

  return (
    <div className="bg-black text-white px-6 md:px-10 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-extrabold mb-4">
      <span className="text-blue-500">{content.header}</span> COMMUNITY
      </h2>

      {/* Description */}
      <p className="text-lg md:text-xl font-semibold mb-4">
        {content.description.main}
      </p>
      <p className="text-base md:text-lg mb-6 text-gray-300">
        {content.description.sub}
      </p>

      {/* Technologies Section */}
      <div className="bg-gray-900 p-5 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-blue-400 mb-2">
          📱 Technologies
        </h3>
        <p className="mb-1">
          <strong>Languages:</strong>{" "}
          {content.technologies.languages.map((e) => `${e}, `)}
        </p>
        <p>
          <strong>Frameworks:</strong>{" "}
          {content.technologies.frameworks.map((e) => `${e}, `)}
        </p>
      </div>

      {/* Meeting Info */}
      <div className="bg-gray-900 p-5 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-blue-400 mb-2">
          🕒 Meeting Info
        </h3>
        <p>{content.meetingInfo}</p>
      </div>

      {/* Team Leads */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3">🧑‍💼 Team Leads</h3>
        <table className="w-full text-left border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {content.teamLeads.map((lead) => (
              <tr className="border-t border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2">{lead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Get Involved */}
      <div className="bg-gray-900 p-5 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-blue-400 mb-2">
          📣 Get Involved
        </h3>
        <p>
          Join our{" "}
          <a
            href={content.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Discord
          </a>{" "}
          to connect with the community.
        </p>
      </div>

      {/* Contact */}
      <div className="bg-gray-900 p-5 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-blue-400 mb-2">✉️ Contact</h3>
        <p>
          Email:{" "}
          <a
            href={`mailto:${content.contact.email}`}
            className="text-blue-400 underline hover:text-blue-300"
          >
            {content.contact.email}
          </a>
        </p>
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {content.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WebPage;
