export default function TechStackSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 text-text dark:text-text-inverted text-center">
      <h2 className="text-4xl font-bold mb-6">Learning by Building</h2>
      <p className="text-lg mb-4">
        We bridge the gap between academic learning and professional application
        by immersing members in development processes that simulate real-world
        environments.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-2">Web Development</h3>
          <p className="text-sm">
            Front-end & back-end workshops, project-based learning, and real
            deployment practice.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-2">AI Development</h3>
          <p className="text-sm">
            Dive into machine learning, data science, and NLP through
            interactive challenges.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-2">App Development</h3>
          <p className="text-sm">
            Build mobile and desktop apps using modern frameworks with
            mentorship support.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-2">Projects</h3>
          <p className="text-sm">
            Collaborate on group projects, contribute to open-source, and apply
            agile workflows.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-2">Hackathons</h3>
          <p className="text-sm">
            Compete and innovate under time pressure in hackathons that test
            your creativity and speed.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-2">Knowledge Sharing</h3>
          <p className="text-sm">
            Present tech talks, exchange ideas, and build confidence through
            peer-led discussions.
          </p>
        </div>
      </div>
    </div>
  );
}
