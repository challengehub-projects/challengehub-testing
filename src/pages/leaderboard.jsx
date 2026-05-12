import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { FaTrophy, FaCrown, FaMedal, FaStar } from "react-icons/fa";
import { FiUsers, FiLoader, FiClock } from "react-icons/fi";

export default function Leaderboard() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");
  const prevIds = useRef(new Set());

  const fetchScores = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/leaderboard");

      const newData = res.data;

      prevIds.current = new Set(newData.map((i) => i.id));
      setData(newData);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 5000);
    return () => clearInterval(interval);
  }, []);

  const topThree = data.slice(0, 3);
  const rest = data.slice(3);

  const getPodiumStyle = (index) => {
    if (index === 0)
      return "bg-gradient-to-b from-yellow-300 to-yellow-500 text-white"; // GOLD
    if (index === 1)
      return "bg-gradient-to-b from-gray-200 to-gray-400 text-gray-800"; // SILVER
    return "bg-gradient-to-b from-orange-300 to-orange-500 text-white"; // BRONZE
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-24">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">

        <div className="bg-white border border-green-100 rounded-3xl shadow p-6 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-green-700 flex items-center gap-3">
              <FaTrophy />
              Leaderboard
            </h1>
            <p className="text-gray-500 text-sm">
              Top performing students
            </p>
          </div>

          <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-bold">
            {data.length} Students
          </div>

        </div>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-32 text-green-600">
          <FiLoader className="text-4xl animate-spin" />
        </div>
      ) : (

        <div className="max-w-6xl mx-auto">

          {/* 🏆 PODIUM TOP 3 */}
          {topThree.length > 0 && (

            <div className="grid md:grid-cols-3 gap-6 mb-10">

              {topThree.map((u, i) => {

                const isUser = u.uid === currentUserId;

                return (

                  <div
                    key={u.id}
                    className={`relative p-6 rounded-3xl shadow-lg border text-center transition-all hover:scale-105 ${getPodiumStyle(i)}`}
                  >

                    {/* RANK ICON */}
                    <div className="flex justify-center mb-3">

                      {i === 0 && <FaCrown className="text-4xl" />}
                      {i === 1 && <FaMedal className="text-4xl" />}
                      {i === 2 && <FaMedal className="text-4xl" />}

                    </div>

                    {/* NAME */}
                    <h2 className="text-xl font-bold">
                      {u.name}
                    </h2>

                    <p className="mt-1 text-sm">
                      {u.percent}%
                    </p>

                    <p className="text-sm mt-2">
                      {u.timeUsed}s
                    </p>

                    {/* YOU BADGE */}
                    {isUser && (
                      <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
                        YOU
                      </span>
                    )}

                  </div>
                );
              })}

            </div>
          )}

          {/* 📊 TABLE */}
          <div className="bg-white border border-green-100 rounded-3xl shadow overflow-hidden">

            <div className="bg-green-600 text-white p-4 font-bold flex items-center gap-2">
              <FiUsers />
              Full Rankings
            </div>

            <table className="w-full text-sm">

              <thead className="bg-green-50 text-green-700">

                <tr>

                  <th className="p-4 text-left">Rank</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Score</th>
                  <th className="p-4 text-left">%</th>
                  <th className="p-4 text-left">Time</th>

                </tr>

              </thead>

              <tbody>

                {rest.map((u, i) => {

                  const isUser = u.uid === currentUserId;

                  return (

                    <tr
                      key={u.id}
                      className={`border-b transition ${
                        isUser
                          ? "bg-green-100 font-bold"
                          : "hover:bg-green-50"
                      }`}
                    >

                      <td className="p-4 text-gray-600">
                        {u.rank}
                      </td>

                      <td className="p-4 flex items-center gap-3">

                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold ${
                          isUser ? "bg-green-600" : "bg-gray-400"
                        }`}>
                          {u.name?.charAt(0)}
                        </div>

                        <span className={isUser ? "text-green-700" : ""}>
                          {u.name}

                          {isUser && (
                            <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                              YOU
                            </span>
                          )}

                        </span>

                      </td>

                      <td className="p-4 font-bold text-green-700">
                        {u.score}/{u.total}
                      </td>

                      <td className="p-4">
                        {u.percent}%
                      </td>

                      <td className="p-4 text-gray-500">
                        {u.timeUsed}s
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}