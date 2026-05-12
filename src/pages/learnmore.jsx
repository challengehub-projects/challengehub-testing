import { FaLightbulb, FaChalkboardTeacher, FaRocket, FaUsers } from "react-icons/fa";

const LearnMorePage = () => {
  const features = [
    {
      title: "Innovative Challenges",
      description: "Engage with unique math and coding challenges designed to boost your skills.",
      icon: <FaLightbulb className="text-green-700 text-3xl" />
    },
    {
      title: "Expert Guidance",
      description: "Learn from top educators and get insights into solving complex problems.",
      icon: <FaChalkboardTeacher className="text-green-700 text-3xl" />
    },
    {
      title: "Track Your Progress",
      description: "View your stats, leaderboard ranking, and areas to improve.",
      icon: <FaRocket className="text-green-700 text-3xl" />
    },
    {
      title: "Collaborate & Connect",
      description: "Join a community of learners, participate in discussions, and form study groups.",
      icon: <FaUsers className="text-green-700 text-3xl" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-24">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-700 mb-4">Learn More About ChallengeHub</h1>
          <p className="text-gray-600 text-lg">Discover how ChallengeHub can help you grow, compete, and excel.</p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-2xl">
              <div className="mb-4">{f.icon}</div>
              <h2 className="text-xl font-bold text-green-700 mb-2">{f.title}</h2>
              <p className="text-gray-600 text-sm">{f.description}</p>
            </div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div className="bg-green-700 text-white rounded-3xl p-12 text-center shadow-lg flex flex-col items-center justify-center gap-6">
          <h2 className="text-4xl font-bold">Ready to level up your skills?</h2>
          <p className="text-lg max-w-xl">
            Join ChallengeHub today and start participating in exciting challenges, track your progress, and see your name on the leaderboard.
          </p>
          <button className="bg-white text-green-700 font-bold py-4 px-10 rounded-2xl hover:bg-green-50 shadow transition-all">
            Get Started
          </button>
        </div>

        {/* ADDITIONAL INFO SECTIONS */}
        <div className="mt-16 space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <img src="/images/learning.png" alt="Learning" className="w-full md:w-1/2 rounded-3xl shadow-lg" />
            <div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">Personalized Learning Experience</h3>
              <p className="text-gray-600 text-lg">ChallengeHub adapts to your skill level, giving you tasks that push your limits without overwhelming you. Track your growth with detailed analytics and stats.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <img src="/images/community.png" alt="Community" className="w-full md:w-1/2 rounded-3xl shadow-lg" />
            <div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">Engaged Community</h3>
              <p className="text-gray-600 text-lg">Join discussions, collaborate with peers, and learn from the experiences of top-performing students. Our community helps you stay motivated and accountable.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LearnMorePage;