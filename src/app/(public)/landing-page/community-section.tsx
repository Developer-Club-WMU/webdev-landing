export default function CommunitySection() {
  return (
    <div className="max-w-4xl mx-auto px-6 text-center text-text dark:text-text-inverted">
      <h2 className="text-4xl font-bold mb-6">Building a Thriving Community</h2>
      <p className="text-lg mb-4">
        Human connection and belonging are just as vital to success as technical
        proficiency. The WMU Developer Club is a place to grow with others.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
          <p className="text-sm">
            Peer mentoring accelerates learning and strengthens community
            connections.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">Inclusive Events</h3>
          <p className="text-sm">
            Socials and team-building sessions foster friendship and a welcoming
            atmosphere.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">Diverse Voices</h3>
          <p className="text-sm">
            We celebrate diversity and ensure that every member is seen, heard,
            and empowered.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">Local Impact</h3>
          <p className="text-sm">
            We enhance WMU’s reputation, drive innovation locally, and build
            future leaders.
          </p>
        </div>
      </div>
      <p className="text-lg mt-8">
        Whether you&apos;re here to learn, lead, or just connect — there&apos;s
        a place for you in the WMU Developer Club.
      </p>
    </div>
  );
}
