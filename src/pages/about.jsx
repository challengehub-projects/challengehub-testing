import { FaUsers, FaRocket, FaBook, FaAward, FaCheckCircle } from "react-icons/fa";

const AboutPage = () => {
  const journey = [
    {
      step: "Join ChallengeHub",
      desc: "Create your account and become part of our learning community.",
    },
    {
      step: "Take Challenges",
      desc: "Attempt quizzes and exams to test your knowledge.",
    },
    {
      step: "Earn Badges",
      desc: "Achieve milestones and unlock badges for your progress.",
    },
    {
      step: "Track Growth",
      desc: "Monitor your scores and improve over time.",
    },
    {
      step: "Become a Top Learner",
      desc: "Compete on leaderboards and shine among peers.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-24">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            About ChallengeHub
          </h1>
          <p className="text-gray-600 text-lg">
            Your hub for learning, challenges, and growth.
          </p>
        </div>

        {/* MISSION & VISION */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow border border-green-100 flex flex-col gap-4">
            <FaRocket className="text-green-600 text-4xl" />
            <h2 className="text-2xl font-bold text-green-700">Our Mission</h2>
            <p className="text-gray-600">
              To provide learners with a secure, interactive platform where they can test knowledge, improve skills, and track progress.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow border border-green-100 flex flex-col gap-4">
            <FaBook className="text-green-600 text-4xl" />
            <h2 className="text-2xl font-bold text-green-700">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading hub for educational challenges, empowering students and professionals worldwide.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center gap-4 text-center">
              <FaUsers className="text-green-600 text-3xl" />
              <h3 className="font-bold text-green-700 text-lg">Community</h3>
              <p className="text-gray-600 text-sm">
                Connect with learners worldwide and compare achievements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center gap-4 text-center">
              <FaAward className="text-green-600 text-3xl" />
              <h3 className="font-bold text-green-700 text-lg">Achievements</h3>
              <p className="text-gray-600 text-sm">
                Earn badges, track progress, and celebrate milestones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center gap-4 text-center">
              <FaBook className="text-green-600 text-3xl" />
              <h3 className="font-bold text-green-700 text-lg">Challenges</h3>
              <p className="text-gray-600 text-sm">
                Take exams and quizzes to sharpen your skills in various subjects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center gap-4 text-center">
              <FaRocket className="text-green-600 text-3xl" />
              <h3 className="font-bold text-green-700 text-lg">Growth</h3>
              <p className="text-gray-600 text-sm">
                Improve scores over time and track your personal learning journey.
              </p>
            </div>
          </div>
        </div>

        {/* JOURNEY TIMELINE */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Your Learning Journey
          </h2>

          <div className="relative border-l-4 border-green-300 ml-4">
            {journey.map((j, idx) => (
              <div key={idx} className="mb-10 ml-6 relative">
                <div className="absolute -left-6 top-0 bg-green-600 w-6 h-6 rounded-full flex items-center justify-center text-white shadow">
                  <FaCheckCircle />
                </div>
                <h3 className="font-bold text-green-700 text-lg">{j.step}</h3>
                <p className="text-gray-600">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="bg-green-100 p-12 rounded-3xl shadow border border-green-200 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Ready to Challenge Yourself?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of learners and take your skills to the next level.
          </p>
          <button className="bg-green-700 text-white font-bold py-3 px-6 rounded-2xl hover:bg-green-800 transition-all shadow">
           <a href="/signup"> Start Learning Now</a>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;