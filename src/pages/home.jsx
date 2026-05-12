import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  FaBookOpen,
  FaTrophy,
  FaMoneyBillWave,
  FaChartLine,
  FaUsers,
  FaLightbulb,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

/* import FloatingUI from "./floatingUi"; */

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    const full = "Welcome to Challengehub";
    let i = 0;

    const interval = setInterval(() => {
      setText(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(interval);
    }, 70);

    return () => clearInterval(interval);
  }, []);


  const Counter = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 1500;
      const step = value / (duration / 16);

      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(interval)
    }, [value]);

    return <span>{count.toLocaleString()}</span>;
  };


  const stats = [
    { label: "Tests Taken", value: 120000 },
    { label: "Active Students", value: 45000 },
    { label: "Success Rate", value: 92 },
    { label: "Rewards Given", value: 18000 },
  ];




  const aims = [
    {
      text: "Helping students improve academically through structured competition",
      icon: FaBookOpen,
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644"
    },
    {
      text: "Encouraging healthy academic rivalry among students",
      icon: FaTrophy,
      img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
    },
    {
      text: "Supporting students financially through rewards and performance",
      icon: FaMoneyBillWave,
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f"
    },
    {
      text: "Making learning interactive, competitive, and engaging",
      icon: FaLightbulb,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    },
  ];

  const platform = [
    {
      icon: FaBookOpen,
      title: "Academic Challenges",
      desc: "WAEC & JAMB-style practice questions for Nigerian students."
    },
    {
      icon: FaTrophy,
      title: "National Competitions",
      desc: "Compete across schools, states, and rank nationally."
    },
    {
      icon: FaMoneyBillWave,
      title: "Student Rewards",
      desc: "Top performers earn real academic financial rewards."
    },
    {
      icon: FaChartLine,
      title: "Smart Tracking",
      desc: "Track progress and improve weak academic areas."
    },
  ];

  const features = [
    {
      icon: FaTrophy,
      title: "Competition System",
      text: "Students compete nationally across Nigeria to rank top academically."
    },
    {
      icon: FaBookOpen,
      title: "Exam Preparation",
      text: "Practice WAEC, JAMB and school exams with real past questions."
    },
    {
      icon: FaMoneyBillWave,
      title: "Financial Motivation",
      text: "Top academic performers earn structured rewards and incentives."
    },
    {
      icon: FaUsers,
      title: "Peer Learning",
      text: "Learn faster by competing and collaborating with other students."
    },
    {
      icon: FaChartLine,
      title: "Performance Analytics",
      text: "Understand your progress and improve smarter, not harder."
    },
    {
      icon: FaLightbulb,
      title: "Skill Growth",
      text: "Build speed, accuracy, and critical thinking for exams."
    },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* CLEAN BACKGROUND (NO BLUR HAZE) */}

      {/*    <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-green-100 top-[-150px] left-[-150px] rounded-full" />
      </div> */}

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6">

        {/* HERO IMAGE (CRISP, NO BLUR) */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-light text-white">
            {text}
            <span className="text-green-400 animate-pulse">|</span>
          </h1>

          <p className="mt-6 text-white/80 text-lg">
            A Nigerian edtech platform where students compete academically,
            grow intellectually, and earn rewards through performance.
          </p>

          {/* CTA BUTTON */}
          <div className="mt-10 flex justify-center gap-4">
            <button className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-lg">
              <a href="/signup">Get Started</a>
            </button>

            <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
            <a href="/learnmore">Learn More</a>
            </button>
          </div>

          {/* MOTTO */}
          <div className="mt-8 text-green-300 tracking-[4px] text-sm">
            BUILDING MINDS INTO THE FUTURE
          </div>

          <div className="h-[3px] bg-green-400 mx-auto mt-8 w-[180px] rounded-full" />
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-white text-center">

        <h2 className="text-3xl mb-12 font-light">Our Impact</h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-green-50 rounded-xl shadow"
            >
              <h3 className="text-3xl font-light text-green-600">
                <Counter value={s.value} />
                {s.label === "Success Rate" ? "%" : "+"}
              </h3>
              <p className="text-gray-600 mt-2">{s.label}</p>
            </motion.div>
          ))}

        </div>
      </section>



      {/* ================= AIMS (IMAGE + TEXT LAYOUT) ================= */}
      <section className="py-24 px-6 bg-white">

        <h2 className="text-3xl text-center mb-16 font-light">
          Our Aims
        </h2>

        <div className="max-w-6xl mx-auto space-y-20">

          {aims.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
            >

              {/* IMAGE */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={a.img}
                  alt="aim"
                  className="w-full h-[320px] object-cover"
                />
              </motion.div>

              {/* TEXT */}
              <div className="w-full md:w-1/2 space-y-4">

                <div className="flex items-center gap-3">
                  <a.icon className="text-green-500 text-2xl" />
                  <h3 className="text-xl font-medium text-gray-800">
                    Aim {i + 1}
                  </h3>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {a.text}
                </p>

                {/* green underline animation */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "120px" }}
                  transition={{ duration: 0.8 }}
                  className="h-[3px] bg-green-500 rounded-full"
                />
              </div>

            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= PLATFORM ================= */}
      <section className="py-24 text-center">

        <h2 className="text-3xl mb-12 font-light">
          How Challengehub Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">

          {platform.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-6 bg-white rounded-xl shadow-md border hover:border-green-400 transition"
            >
              <p.icon className="text-green-500 text-2xl mx-auto mb-3" />
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{p.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= FEATURES (GREEN ACCENT CARDS) ================= */}
      <section className="py-24 px-6 bg-green-50 text-center">

        <h2 className="text-3xl mb-12 font-light">
          Why Students Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-xl shadow-md border-l-4 border-green-500"
            >
              <f.icon className="text-green-500 text-2xl mx-auto mb-3" />
              <h3 className="font-medium">{f.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{f.text}</p>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
}