const EventsPage = () => {
    return (
        <div className="bg-black text-white min-h-screen w-full overflow-x-hidden">
            <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
                {/* Page Title */}
                <h1 className="text-5xl font-extrabold mb-10">
                    <span className="text-yellow-400">CLUB</span> EVENTS
                </h1>

                {/* Type of Events Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-2">TYPE OF EVENTS</h2>
                    <p className="text-lg text-gray-300">
                    Bi-weekly meetings with workshops, guest speakers, hackathon/competitions, and company tours
                    </p>
                </div>

                {/* Upcoming Events Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6">UPCOMING EVENTS</h2>

                    <div className="space-y-6">
                        {/* Info Night Announcement */}
                        <div className="bg-gray-900 rounded-2xl border border-blue-500 p-6">
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">📣 WMU Developer Club Info Night</h3>
                            <p className="text-gray-300 mb-4">
                                Hello Everyone,
                            </p>
                            <p className="text-gray-400 mb-4">
                                I'm excited to announce the launch of a brand new student organization at Western Michigan University — <span className="text-white font-semibold">Developer Club</span> — a community for computer science students who want to bridge the gap between academia and the tech industry.
                            </p>
                            <p className="text-gray-400 mb-4">
                                One of the biggest challenges for students in tech is that college often focuses heavily on theory—covering algorithms and concepts—without offering enough real-world, hands-on experience. This gap makes it tough to land jobs that require practical skills like building full-stack apps, deploying machine learning models, or collaborating with teams using industry tools.
                            </p>
                            <p className="text-gray-400 mb-4">
                                <span className="text-white font-semibold">Developer Club’s mission</span> is to bridge that gap by giving students the opportunity to work on real projects, join specialized tech departments (like web, AI/ML, game dev, automation, and more), and gain experience that actually prepares them for the tech industry.
                            </p>
                            <p className="text-gray-300 mb-4">
                                <strong>Come join us for our first ever Info Night! KVCC Students are welcome!</strong><br />
                                <span className="text-yellow-300">📅 Monday, April 14th<br />🕕 6PM – 8PM<br />📍 WMU College of Engineering and Applied Sciences, Room D115 and D109</span>
                            </p>
                            <p className="text-gray-400 mb-4">
                                This will be a casual kickoff event where you can learn what the club is all about, meet the team, and sign up for the departments that interest you most. You’ll also get a sneak peek at the Developer Challenge, a year-long project initiative that each team will work on throughout the year.
                            </p>
                            <p className="text-gray-400 mb-4">
                                <strong>There will be food and drinks, so come hungry!</strong><br />
                                We’ll also be doing a fun icebreaker bingo activity to help you connect with other students and get to know potential teammates across different departments.
                            </p>
                            <div className="text-gray-400">
                                As a member of Developer Club, you’ll get access to:
                                <ul className="list-disc list-inside mt-2 text-gray-300">
                                    <li>Hands-on project experience</li>
                                    <li>Bi-weekly meetings with workshops, guest speakers, and company tours</li>
                                    <li>Exclusive developer resources — including Mac Minis, servers, and more!</li>
                                </ul>
                                <br />
                                No matter your experience level, if you're passionate about building, learning, and collaborating, there’s a spot for you in Dev Club.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
