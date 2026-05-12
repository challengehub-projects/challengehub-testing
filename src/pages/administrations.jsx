import { FaUserTie, FaUsers, FaEnvelope } from "react-icons/fa";

const AdministrationPage = () => {
  const admins = [
    { name: "Alice Johnson", role: "Founder & CEO", email: "alice@challengehub.com" },
    { name: "Bob Smith", role: "CTO", email: "bob@challengehub.com" },
    { name: "Clara Lee", role: "Head of Education", email: "clara@challengehub.com" },
    { name: "David Kim", role: "Community Manager", email: "david@challengehub.com" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-24">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-2 flex justify-center items-center gap-3">
            <FaUsers /> Our Administration
          </h1>
          <p className="text-gray-600 text-lg">
            Meet the team driving ChallengeHub forward
          </p>
        </div>

        {/* ADMIN CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {admins.map((admin, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center gap-4">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center text-green-700 text-3xl">
                <FaUserTie />
              </div>
              <h2 className="text-xl font-bold text-green-700">{admin.name}</h2>
              <p className="text-gray-600 text-sm">{admin.role}</p>
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <FaEnvelope /> {admin.email}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdministrationPage;