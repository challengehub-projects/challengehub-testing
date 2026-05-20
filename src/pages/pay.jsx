import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiLock, FiCheckCircle, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1500); // Amount in Naira

 const email = localStorage.getItem("Email") || "";
 console.log(email)

  const handlePayment = async (email, amount) => {
    try {
      setIsProcessing(true);
      const res = await axios.post("https://challengehub-backend.onrender.com/api/payment/initialize", {
        email, // Dynamic email
        amount: amount * 100, // Paystack expects amount in Kobo/cents
      });

      const reference = res.data.reference;
      localStorage.setItem("reference", reference);

      // Redirect to Paystack
      window.location.href = res.data.authorization_url;
    } catch (error) {
      console.error("Payment Error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

        {/* HEADER SECTION */}
        <div className="bg-green-600 p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <FiShield className="text-3xl text-white" />
          </div>
          <h2 className="text-2xl font-bold">Secure Checkout</h2>
          <p className="text-green-100 text-sm mt-1">Complete your registration to start the exam</p>
        </div>

        {/* DETAILS SECTION */}
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <span className="text-gray-500 font-medium">Recipient</span>
              <span className="text-gray-800 font-semibold">{email}</span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <span className="text-gray-500 font-medium">Service</span>
              <span className="text-gray-800 font-semibold">CBT Examination Fee</span>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-green-700 text-xs font-bold uppercase tracking-wider">Total Amount</p>
                <h3 className="text-3xl font-black text-green-900 mt-1">₦{amount.toLocaleString()}</h3>
              </div>
              <FiCheckCircle className="text-green-500 text-2xl" />
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full mt-8 py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200 ${isProcessing
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:scale-95"
              }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FiLock className="text-lg" />
                Pay Safely with Paystack
              </>
            )}
          </button>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 uppercase tracking-widest font-bold">
              <FiLock /> Secured by Paystack & SSL Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
