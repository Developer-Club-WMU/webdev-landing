type Content = {
  header: string;
  description: {
    main: string;
    sub: string;
  };
  technologies: {
    languages: string[];
    frameworks: string[];
  };
  meetingInfo: string;
  teamLeads: string[];
  contact: {
    email: string;
    discord: string;
  };
  tags: string[];
};

const CommunityDetails = ({ content }: { content: Content }) => {
  return (
    <div className="mt-10 bg-black text-white px-6 md:px-10 py-12 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text flex items-center gap-3">
        🚀 {content.header} <span>COMMUNITY</span>
      </h2>

      {/* Description */}
      <p className="text-lg md:text-xl font-medium mb-3">
        {content.description.main}
      </p>
      <p className="text-base md:text-lg mb-8 text-gray-400">
        {content.description.sub}
      </p>

      {/* Technologies */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl mb-6 shadow-md">
        <h3 className="text-xl font-bold text-blue-400 mb-4">
          📱 Technologies
        </h3>
        <div className="mb-2">
          <strong>Languages:</strong>
          <div className="flex flex-wrap gap-2 mt-1">
            {content.technologies.languages.map((lang) => (
              <span
                key={lang}
                className="bg-blue-700/80 px-3 py-1 rounded-full text-sm"
              >
                #{lang}
              </span>
            ))}
          </div>
        </div>
        <div>
          <strong>Frameworks:</strong>
          <div className="flex flex-wrap gap-2 mt-1">
            {content.technologies.frameworks.map((fw) => (
              <span
                key={fw}
                className="bg-green-700/80 px-3 py-1 rounded-full text-sm"
              >
                #{fw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Meeting Info */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl mb-6 shadow-md">
        <h3 className="text-xl font-bold text-blue-400 mb-2">
          🕒 Meeting Info
        </h3>
        <p className="text-gray-200">{content.meetingInfo}</p>
      </div>

      {/* Team Leads */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3">🧑‍💼 Team Leads</h3>
        <table className="w-full border border-gray-800 rounded-xl overflow-hidden shadow">
          <thead className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Name</th>
            </tr>
          </thead>
          <tbody>
            {content.teamLeads.map((lead) => (
              <tr
                key={lead}
                className="bg-gray-900 border-t border-gray-800 hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2">{lead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Get Involved */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl mb-6 shadow-md">
        <h3 className="text-xl font-bold text-blue-400 mb-2">
          📣 Get Involved
        </h3>
        <p className="text-gray-200 mb-2">
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
      <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl mb-6 shadow-md">
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

export default CommunityDetails;
