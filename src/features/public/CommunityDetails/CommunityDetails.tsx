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
    <div className="mx-auto mt-10 max-w-4xl bg-white px-6 py-12 font-sans text-black md:px-10 dark:bg-black dark:text-white">
      {/* Header */}
      <h2 className="mb-6 flex items-center gap-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
        🚀 {content.header} <span>COMMUNITY</span>
      </h2>

      {/* Description */}
      <p className="mb-3 text-justify text-lg font-medium md:text-xl">
        {content.description.main}
      </p>
      <p className="mb-8 text-justify text-base text-gray-700 md:text-lg dark:text-gray-400">
        {content.description.sub}
      </p>

      {/* Technologies */}
      <div className="mb-6 rounded-xl border border-gray-300 bg-gray-100/70 p-6 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-4 text-xl font-bold text-blue-500 dark:text-blue-400">
          📱 Technologies
        </h3>
        <div className="mb-2">
          <strong>Languages:</strong>
          <div className="mt-1 flex flex-wrap gap-2">
            {content.technologies.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-900 dark:bg-blue-700/80 dark:text-white"
              >
                #{lang}
              </span>
            ))}
          </div>
        </div>
        <div>
          <strong>Frameworks:</strong>
          <div className="mt-1 flex flex-wrap gap-2">
            {content.technologies.frameworks.map((fw) => (
              <span
                key={fw}
                className="rounded-full bg-green-200 px-3 py-1 text-sm text-green-900 dark:bg-green-700/80 dark:text-white"
              >
                #{fw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Meeting Info */}
      <div className="mb-6 rounded-xl border border-gray-300 bg-gray-100/70 p-6 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 text-xl font-bold text-blue-500 dark:text-blue-400">
          🕒 Meeting Info
        </h3>
        <p className="text-gray-800 dark:text-gray-200">
          {content.meetingInfo}
        </p>
      </div>

      {/* Team Leads */}
      <div className="mb-6">
        <h3 className="mb-3 text-xl font-bold">🧑‍💼 Team Leads</h3>
        <table className="data-table-container">
          <thead className="data-table-header">
            <tr>
              <th className="data-table-header-cell">Name</th>
            </tr>
          </thead>
          <tbody>
            {content.teamLeads.map((lead) => (
              <tr
                key={lead}
                className="data-table-row data-table-row-clickable"
              >
                <td className="data-table-cell">{lead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Get Involved */}
      <div className="mb-6 rounded-xl border border-gray-300 bg-gray-100/70 p-6 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 text-xl font-bold text-blue-500 dark:text-blue-400">
          📣 Get Involved
        </h3>
        <p className="mb-2 text-gray-800 dark:text-gray-200">
          Join our{" "}
          <a
            href={"https://discord.com/invite/G9yE5s6NFM"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Discord
          </a>{" "}
          to connect with the community.
        </p>
      </div>

      {/* Contact */}
      <div className="mb-6 rounded-xl border border-gray-300 bg-gray-100/70 p-6 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 text-xl font-bold text-blue-500 dark:text-blue-400">
          ✉️ Contact
        </h3>
        <p className="text-gray-800 dark:text-gray-200">
          Email:{" "}
          <a
            href={`mailto:${content.contact.email}`}
            className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
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
            className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CommunityDetails;
