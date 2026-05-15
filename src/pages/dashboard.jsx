import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCreditCard,
  FaBrain,
  FaTrophy,
  FaBook,
} from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);

      localStorage.setItem("Email", res.data.user.email);

      console.log(res.data.user.email);

      toast.success("Welcome back 👋", {
        style: {
          background: "#fff",
          color: "#111",
          borderLeft: "5px solid #22c55e",
        },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unauthorized access",
        {
          style: {
            background: "#fff",
            color: "#111",
            borderLeft: "5px solid #ef4444",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="animate-pulse text-gray-500">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">No user found</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6 mt-12">
        
  

      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= HERO AI WELCOME CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 opacity-10 text-[120px]">
            🤖
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {user.surname} 👋
          </h1>

          <p className="mt-2 text-green-100">
            AI-powered Student Dashboard — Challengehub Intelligence System
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Smart Analytics Active
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Secure Session
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Real-time Sync
            </span>
          </div>
        </motion.div>

        {/* ================= STATS CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-5">

          <Card
            icon={<FaUser />}
            title="Surname"
            value={user.surname}
            color="bg-white"
          />

            <Card
            icon={<FaUser />}
            title="Other Names"
            value={user.otherNames}
            color="bg-white"
          />

          <Card
            icon={<FaEnvelope />}
            title="Email"
            value={user.email}
            color="bg-white"
          />

          <Card
            icon={<FaCreditCard />}
            title="Payment"
            value={user.paymentStatus}
            color={
              user.paymentStatus === "paid"
                ? "bg-green-100"
                : "bg-red-100"
            }
          />

          <Card
            icon={<FaBook />}
            title="Quiz Status"
            value={
              user.hasTakenQuiz ? "Completed" : "Not Started"
            }
            color={
              user.hasTakenQuiz
                ? "bg-blue-100"
                : "bg-yellow-100"
            }
          />
        </div>

        {/* ================= AI INSIGHT CARD ================= */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <FaBrain className="text-green-600 text-xl" />
            <h2 className="font-bold text-lg">
              AI Performance Insight
            </h2>
          </div>

          <p className="text-gray-600">
            {user.hasTakenQuiz
              ? "Great job! You’ve completed your assessment. Keep improving to reach top rankings."
              : "You haven't taken the quiz yet. Start now to unlock ranking and AI feedback insights."}
          </p>
        </motion.div>

        {/* ================= PROFILE INFO ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4 text-gray-700">
            Profile Details
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <Info label="Surname" value={user.surname} />
            <Info label="Other Names" value={user.otherNames} />
            <Info label="Category" value={user.category} />
            <Info label="Role" value={user.role} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= CARD COMPONENT ================= */
function Card({ icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`${color} p-5 rounded-xl shadow-sm border`}
    >
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span className="text-sm">{title}</span>
      </div>
      <p className="font-semibold text-lg mt-2">{value}</p>
    </motion.div>
  );
}

/* ================= INFO COMPONENT ================= */
function Info({ label, value }) {
  return (
    <div className="p-3 border rounded-lg bg-gray-50">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
