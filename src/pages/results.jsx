import { useLocation, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import {
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiFileText,
  FiAward,
  FiHome,
  FiThumbsUp,
  FiSmile,
  FiAlertCircle,
} from "react-icons/fi";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { questions, currentAnswers } = state;

  let correct = 0;

  questions.forEach((q, i) => {
    if (currentAnswers[i] === q.correct_answer) {
      correct++;
    }
  });

  const percent = Math.round((correct / questions.length) * 100);
  const wrong = questions.length - correct;

  // REMARK SYSTEM
  const getRemark = () => {
    if (percent >= 80) {
      return {
        text: "Excellent Performance",
        icon: <FiAward className="text-yellow-500 text-xl" />,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      };
    }

    if (percent >= 60) {
      return {
        text: "Good Job",
        icon: <FiThumbsUp className="text-blue-500 text-xl" />,
        color: "text-blue-600",
        bg: "bg-blue-100",
      };
    }

    if (percent >= 40) {
      return {
        text: "Fair Attempt",
        icon: <FiSmile className="text-green-500 text-xl" />,
        color: "text-green-600",
        bg: "bg-green-100",
      };
    }

    return {
      text: "Needs Improvement",
      icon: <FiAlertCircle className="text-red-500 text-xl" />,
      color: "text-red-600",
      bg: "bg-red-100",
    };
  };

  const remark = getRemark();

  // PIE CHART DATA
  const data = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: [correct, wrong],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                <FiAward className="text-yellow-500" />
                Exam Results
              </h1>

              <p className="text-gray-500 mt-2">
                Review your performance and question breakdown.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-5 rounded-3xl shadow-lg text-center">
              <p className="text-sm opacity-80">
                Final Score
              </p>

              <h2 className="text-4xl font-black">
                {percent}%
              </h2>
            </div>

          </div>
        </div>
      </div>

      {/* TOP STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* TOTAL */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition-all">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Total Questions
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-1">
                {questions.length}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <FiBarChart2 className="text-blue-600 text-2xl" />
            </div>

          </div>
        </div>

        {/* CORRECT */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition-all">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Correct Answers
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-1">
                {correct}
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <FiCheckCircle className="text-green-600 text-2xl" />
            </div>

          </div>
        </div>

        {/* WRONG */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition-all">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Wrong Answers
              </p>

              <h2 className="text-3xl font-bold text-red-500 mt-1">
                {wrong}
              </h2>
            </div>

            <div className="bg-red-100 p-4 rounded-2xl">
              <FiXCircle className="text-red-500 text-2xl" />
            </div>

          </div>
        </div>

        {/* REMARK */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition-all">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500 mb-3">
                Performance
              </p>

              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl w-fit ${remark.bg}`}>
                {remark.icon}

                <span className={`font-semibold text-sm ${remark.color}`}>
                  {remark.text}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* CHART + SUMMARY */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 mb-10">

        {/* PIE CHART */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Performance Overview
          </h2>

          <div className="max-w-sm mx-auto">
            <Pie data={data} />
          </div>

        </div>

        {/* SUMMARY */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
              <span>Total Questions</span>
              <span className="font-bold">{questions.length}</span>
            </div>

            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
              <span>Correct Answers</span>
              <span className="font-bold">{correct}</span>
            </div>

            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
              <span>Wrong Answers</span>
              <span className="font-bold">{wrong}</span>
            </div>

            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
              <span>Accuracy</span>
              <span className="font-bold">{percent}%</span>
            </div>

          </div>

          <div className={`mt-8 flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-white ${remark.bg}`}>

            {remark.icon}

            <span className={`font-bold ${remark.color}`}>
              {remark.text}
            </span>

          </div>

        </div>

      </div>

      {/* BREAKDOWN TITLE */}
      <div className="max-w-6xl mx-auto mb-5">

        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <FiFileText />
          Question Breakdown
        </h2>

      </div>

      {/* QUESTIONS */}
      <div className="max-w-6xl mx-auto space-y-5">

        {questions.map((q, i) => {

          const correctAns = q.correct_answer;
          const userAns = currentAnswers[i];
          const isCorrect = correctAns === userAns;

          return (
            <div
              key={i}
              className={`rounded-3xl border shadow-md p-6 transition-all hover:shadow-xl ${
                isCorrect
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >

              <div className="flex flex-col lg:flex-row justify-between gap-6">

                <div className="flex-1">

                  {/* QUESTION */}
                  <h3
                    className="text-lg font-bold text-gray-800 mb-5 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: q.question }}
                  />

                  {/* ANSWERS */}
                  <div className="space-y-4">

                    {/* USER ANSWER */}
                    <div className="bg-white rounded-2xl border p-4">

                      <p className="text-sm text-gray-500 mb-2">
                        Your Answer
                      </p>

                      <p
                        className={`font-semibold ${
                          isCorrect
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: userAns || "No answer",
                        }}
                      />

                    </div>

                    {/* CORRECT ANSWER */}
                    {!isCorrect && (
                      <div className="bg-white rounded-2xl border p-4">

                        <p className="text-sm text-gray-500 mb-2">
                          Correct Answer
                        </p>

                        <p
                          className="font-semibold text-green-600"
                          dangerouslySetInnerHTML={{
                            __html: correctAns,
                          }}
                        />

                      </div>
                    )}

                  </div>
                </div>

                {/* STATUS ICON */}
                <div className="flex lg:block justify-end">

                  {isCorrect ? (
                    <div className="bg-green-500 text-white p-4 rounded-2xl shadow-lg">
                      <FiCheckCircle className="text-3xl" />
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white p-4 rounded-2xl shadow-lg">
                      <FiXCircle className="text-3xl" />
                    </div>
                  )}

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* FOOTER */}
      <div className="max-w-6xl mx-auto mt-10">

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-5">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Final Score: {percent}%
            </h2>

            <div className="mt-3">

              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl w-fit ${remark.bg}`}>
                {remark.icon}

                <span className={`font-semibold ${remark.color}`}>
                  {remark.text}
                </span>
              </div>

            </div>

          </div>

          {/* DASHBOARD BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg"
          >

            <FiHome className="text-xl" />
            Back to Dashboard

          </button>

        </div>

      </div>

    </div>
  );
};

export default Results;