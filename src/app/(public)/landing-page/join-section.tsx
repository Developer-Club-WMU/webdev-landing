export default function JoinSection() {
  return (
    <div className="flex items-center justify-center px-6 min-h-screen text-text dark:text-text-inverted">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl p-10 max-w-xl w-full text-center animate-fade-in-up">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">
          Join the Movement
        </h2>
        <p className="text-lg mb-6 opacity-90">
          We’re open to all majors and experience levels — whether you’re a
          curious beginner or a seasoned hacker. Just show up and start
          building.
        </p>
        <a
          href="https://discord.com/invite/G9yE5s6NFM"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow hover:bg-yellow-300 transition"
        >
          Join Our Discord
        </a>
        <p className="mt-4 text-sm opacity-75">
          Weekly meetings • Hands-on projects • Real community
        </p>
      </div>
    </div>
  );
}
