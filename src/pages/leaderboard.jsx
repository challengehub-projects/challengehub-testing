import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icon Packages
import { FaTrophy, FaCrown, FaMedal } from "react-icons/fa";
import { FiUsers, FiLoader } from "react-icons/fi";

const BACKEND_BASE_URL = "http://localhost:3000";
const PROFILE_URL = `${BACKEND_BASE_URL}/api/profile`;

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);

  const currentUserEmail = localStorage.getItem("email");

  const previousDataMapRef = useRef(new Map());
  const isInitialLoadRef = useRef(true);
  
     // =========================
  // FETCH AND APPEND PROFILES DIRECTLY INTO DATA ARRAY
  // =========================
  const fetchProfile = async (leaderboardData = []) => {
    try {
      // 1. Map through all students to fetch their profiles concurrently
      const updatedStudentsRequests = leaderboardData.map(async (student) => {
        if (!student.email) return student;

        try {
          // 2. Fetch the profile for EACH email (including yours to guarantee it doesn't get skipped as null)
          const res = await axios.get(`${PROFILE_URL}?email=${encodeURIComponent(student.email)}`);
          const userProfileData = res.data.user;

          // 3. Extract the correct image URL field from the response
          const profileImgUrl =
            userProfileData?.profilePic ||
            userProfileData?.photoURL ||
            userProfileData?.profileImage ||
            userProfileData?.avatar ||
            null;

          return {
            ...student,
            profilePic: profileImgUrl // Injects the image directly onto the student object
          };
        } catch (err) {
          console.error(`Failed to load profile pic for ${student.email}:`, err);
          return { ...student, profilePic: null }; // Graceful fallback for network drops
        }
      });

      const fullyResolvedData = await Promise.all(updatedStudentsRequests);

      // 4. Update the state once all profiles have resolved cleanly
      setData(fullyResolvedData);
      
    } catch (err) {
      console.error("Error executing profile image injection loop:", err);
    }
  };

    const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/exam/leaderboard`);
      const rawData = res.data;

      const ranked = rawData.map((u, i) => ({
        ...u,
        rank: i + 1,
      }));

      // Real-time toast evaluations
      if (!isInitialLoadRef.current) {
        ranked.forEach((student) => {
          const prev = previousDataMapRef.current.get(student.email);
          const name = student.name || "A student";

          if (!prev) {
            toast.info(`🎉 ${name} joined the leaderboard!`, { theme: "light", autoClose: 3000 });
          } else if (prev.percent !== student.percent || prev.timeUsed !== student.timeUsed) {
            toast.success(`⚡ ${name} updated their score: ${prev.percent}% → ${student.percent}%`, { theme: "light", autoClose: 3000 });
          }
        });
      }

      const map = new Map();
      ranked.forEach((u) => { map.set(u.email, u); });
      previousDataMapRef.current = map;
      isInitialLoadRef.current = false;

      // 🔥 REMOVED: setData(ranked) from here to prevent infinite loop jumping.
      // Instead, we pass 'ranked' to fetchProfile, which handles setting the final state for us!
      fetchProfile(ranked);

    } catch (err) {
      console.error("Error fetching leaderboard", err);
    } finally {
      setLoading(false);
    }
  };




  // =========================
  // INITIAL DATA LIFECYCLE
  // =========================
  useEffect(() => {
    fetchProfile();
    fetchLeaderboard();

    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const topThree = data.slice(0, 3);

    // =========================
  // IMAGE AND TEXT FALLBACK RESOLVERS
  // =========================
  const getCurrentUserImage = () => {
    if (!profile) return null;
    return (
      profile.profilePic ||
      profile.photoURL ||
      profile.profileImage ||
      profile.avatar ||
      null
    );
  };

  const currentUserImage = getCurrentUserImage();

  const getInitial = (user) => {
    return (
      user?.name?.charAt(0)?.toUpperCase() ||
      user?.surname?.charAt(0)?.toUpperCase() ||
      profile?.name?.charAt(0)?.toUpperCase() ||
      profile?.surname?.charAt(0)?.toUpperCase() ||
      "U"
    );
  };

  const podiumColor = (i) => {
    if (i === 0) return "border-green-500 bg-green-50";
    if (i === 1) return "border-green-300 bg-white";
    return "border-green-200 bg-green-50/40";
  };

    // =========================
  // REUSABLE AVATAR SUBCOMPONENT (FIXED VIEW)
  // =========================
  const ProfileAvatar = ({ user, large = false }) => {
    // Read the injected profile image directly from the user loop data for EVERYONE
    const image =
      user?.profilePic ||
      user?.photoURL ||
      user?.profileImage ||
      user?.avatar ||
      null;

    return (
      <div
        className={`${
          large ? "w-16 h-16 text-xl" : "w-8 h-8 text-xs"
        } rounded-full bg-green-600 text-white flex items-center justify-center overflow-hidden flex-shrink-0 font-semibold ${
          large ? "border-4 border-white shadow-sm" : ""
        }`}
      >
        {image ? (
          <img
            src={image}
            alt={user?.name || "Student"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          getInitial(user)
        )}
      </div>
    );
  };


  // =========================
  // INTERFACE RENDER LAYOUT
  // =========================
  return (
    <div className="min-h-screen bg-white pt-24 px-4">
      <ToastContainer />

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                <FaTrophy />
                Leaderboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Performance rankings across all students
              </p>
            </div>
            <div className="md:justify-self-end">
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl font-semibold border border-green-100 w-fit">
                {data.length} Students
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER VIEW STATE */}
      {loading ? (
        <div className="flex justify-center py-24 text-green-600">
          <FiLoader className="text-3xl animate-spin" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          
          {/* PODIUM SECTION */}
          {topThree.length > 0 && (
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {topThree.map((u, i) => {
                const isUser = u.email === currentUserEmail;
                return (
                  <div
                    key={u.email}
                    className={`relative rounded-2xl border p-6 text-center shadow-sm transition hover:shadow-md ${podiumColor(i)} ${
                      isUser ? "ring-2 ring-green-400" : ""
                    }`}
                  >
                    <div className="flex justify-center mb-3">
                      {i === 0 && <FaCrown className="text-green-600 text-2xl" />}
                      {i === 1 && <FaMedal className="text-green-500 text-2xl" />}
                      {i === 2 && <FaMedal className="text-green-400 text-2xl" />}
                    </div>

                    <div className="flex justify-center mb-3">
                      <ProfileAvatar user={u} large />
                    </div>

                    <h2 className="font-semibold text-gray-800 truncate px-2" title={u.name}>
                      {u.name}
                    </h2>
                    <p className="text-green-700 font-bold mt-1 whitespace-nowrap">{u.percent}%</p>
                    <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">Time: {u.timeUsed}s</p>

                    {isUser && (
                      <span className="absolute top-3 right-3 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                        YOU
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* FULL TABLE RANKINGS */}
          <div className="bg-white border border-green-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-2 font-semibold">
              <FiUsers />
              Full Rankings
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm table-auto">
                <thead className="bg-green-50 text-green-700">
                  <tr>
                    <th className="p-4 text-left whitespace-nowrap">Rank</th>
                    <th className="p-4 text-left whitespace-nowrap">Name</th>
                    <th className="p-4 text-left whitespace-nowrap">Score</th>
                    <th className="p-4 text-left whitespace-nowrap">%</th>
                    <th className="p-4 text-left whitespace-nowrap">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((u) => {
                    const isUser = u.email === currentUserEmail;
                    return (
                      <tr
                        key={u.email}
                        className={`border-t transition ${
                          isUser ? "bg-green-50 font-semibold" : "hover:bg-green-50/40"
                        }`}
                      >
                        <td className="p-4 text-gray-600 whitespace-nowrap">#{u.rank}</td>
                        <td className="p-4 flex items-center gap-2 max-w-xs md:max-w-md">
                          <ProfileAvatar user={u} />
                          <span className="truncate block flex-1" title={u.name}>
                            {u.name}
                          </span>
                          {isUser && (
                            <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full flex-shrink-0">
                              YOU
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-green-700 font-semibold whitespace-nowrap">
                          {u.score}/{u.total}
                        </td>
                        <td className="p-4 whitespace-nowrap">{u.percent}%</td>
                        <td className="p-4 text-gray-500 whitespace-nowrap">{u.timeUsed}s</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
