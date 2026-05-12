import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake submission demo
    toast.success("Message sent successfully! ✅");

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-24">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Have questions or feedback? We’d love to hear from you.
          </p>
        </div>

        {/* INFO */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-center">
          <div className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center gap-4">
            <FaMapMarkerAlt className="text-green-600 text-3xl" />
            <p className="text-green-700 font-bold">Location</p>
            <p className="text-gray-600 text-sm">123 Challenge St, LearnCity, ED</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center gap-4">
            <FaPhone className="text-green-600 text-3xl" />
            <p className="text-green-700 font-bold">Phone</p>
            <p className="text-gray-600 text-sm">+123 456 7890</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow border border-green-100 flex flex-col items-center gap-4">
            <FaEnvelope className="text-green-600 text-3xl" />
            <p className="text-green-700 font-bold">Email</p>
            <p className="text-gray-600 text-sm">support@challengehub.com</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white p-8 rounded-3xl shadow border border-green-100">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none h-32"
            />
            <button
              type="submit"
              className="bg-green-700 text-white py-4 rounded-2xl font-bold hover:bg-green-800 transition-all shadow"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;