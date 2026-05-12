import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ChallengePage() {
  const [stats, setStats] = useState({
    participants: 0,
    testsToday: 0,
    active: 0,
  });

  // fake animated counter (you can replace with backend later)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        participants: Math.min(prev.participants + 200, 12540),
        testsToday: Math.min(prev.testsToday + 50, 3215),
        active: Math.min(prev.active + 1, 18),
      }));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Compete with Friends & Families",
      desc: "Invite your friends and family to a fun learning challenge.",
      mode: "friends",
    },
    {
      title: "Compete with Groups",
      desc: "Join a group and challenge other groups in team battles.",
      mode: "group",
    },
    {
      title: "General Competition",
      desc: "Compete globally and climb the leaderboard rankings.",
      mode: "general",
    },
  ];

  const features = [
    {
      icon: "📚",
      title: "Access Free Tests",
      desc: "High-quality academic tests across multiple subjects.",
    },
    {
      icon: "👥",
      title: "Compete in Groups",
      desc: "Challenge classmates and friends in real-time battles.",
    },
    {
      icon: "🏆",
      title: "Win Rewards",
      desc: "Earn certificates, badges, and leaderboard recognition.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-green-600 to-indigo-700 text-white relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10"
        >

          {/* LEFT */}
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Challenge Yourself.
              <br /> Compete & Win.
            </h2>

            <p className="mt-4 text-white/90 text-lg">
              Take tests, join competitions, and track your academic growth.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-6 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold"
            >
              Start Free Test
            </motion.button>
          </div>

          {/* RIGHT STATS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:w-1/2 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20"
          >
            <h3 className="text-lg font-semibold mb-4">
              Live Competition Stats
            </h3>

            <div className="space-y-3 text-sm">
              <Stat label="Total Participants" value={stats.participants} />
              <Stat label="Tests Taken Today" value={stats.testsToday} />
              <Stat label="Active Competitions" value={stats.active} />
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-6">

        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-green-700 mb-3">
              {c.title}
            </h3>

            <p className="text-gray-600 mb-6">{c.desc}</p>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
              Start Challenge
            </button>
          </motion.div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="text-3xl font-bold mb-10">
            Why Choose Challengehub?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-xl shadow-md border bg-gray-50"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{f.title}</h4>
                <p className="text-gray-600">{f.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}

/* STAT COMPONENT */
function Stat({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span>{label}</span>
      <span className="font-bold">{value.toLocaleString()}</span>
    </div>
  );
}