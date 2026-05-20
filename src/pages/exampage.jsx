import { useEffect, useState } from "react";
import axios from "axios";
import { FiClock, FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./confirmmodal";

const ExamPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentAnswers, setCurrentAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(300);
    const [loading, setLoading] = useState(true); // Added loading state
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    // ✅ FETCH QUESTIONS FIRST
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    "https://opentdb.com/api.php?amount=5&category=19&type=multiple"
                );
                setQuestions(res.data.results);
            } catch (err) {
                toast.error("Failed to load questions");
            } finally {
                setLoading(false); // Timer starts only after this
            }
        };

        fetchQuestions();
    }, []);

    // ✅ TIMER (Only runs when not loading)
    useEffect(() => {
        if (loading || timeLeft <= 0) {
            if (timeLeft === 0) handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, loading]);

    const handleSelect = (qIndex, answer) => {
        setCurrentAnswers({ ...currentAnswers, [qIndex]: answer });
    };

    const handleSubmit = async () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (currentAnswers[i] === q.correct_answer) score++;
        });

        try {
            const uid = localStorage.getItem("userId");
            const res = await axios.post("https://challengehub-backend.onrender.com/api/auth/user", { uid });
            const userData = res.data;

            await axios.post("https://challengehub-backend.onrender.com/api/submit", {
                name: `${userData.surname} ${userData.othernames}`,
                email: userData.email,
                score,
                total: questions.length,
                percent: Math.round((score / questions.length) * 100),
                timeUsed: 300 - timeLeft,
            });

            toast.success("Exam submitted successfully!");
            navigate("/results", { state: { questions, currentAnswers } });
        } catch (err) {
            console.error(err);
            toast.error("Error submitting exam");
        }
    };

    // LOADING VIEW
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
                <FiLoader className="text-4xl animate-spin text-blue-600 mb-4" />
                <h1 className="text-xl font-semibold">Preparing your exam...</h1>
                <p>Please wait while we fetch the questions.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* TIMER */}
            <div className={`sticky top-0 z-10 bg-white/80 backdrop-blur flex items-center gap-2 text-lg font-bold mb-6 p-4 rounded-lg shadow-sm ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
                <FiClock />
                <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>

            {/* QUESTIONS */}
            {questions.map((q, i) => {
                const options = [...q.incorrect_answers, q.correct_answer].sort();

                return (
                    <div key={i} className="mb-6 p-6 bg-white border rounded-xl shadow-sm">
                        <h2 className="font-semibold text-lg mb-4" dangerouslySetInnerHTML={{ __html: q.question }} />

                        <div className="grid gap-3">
                            {options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(i, opt)}
                                    className={`p-3 text-left border-2 rounded-lg transition-all ${
                                        currentAnswers[i] === opt
                                            ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                                            : "border-gray-100 hover:border-gray-300"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: opt }}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* SUBMIT */}
            <button
                onClick={() => setShowModal(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
            >
                Submit Final Answers
            </button>

            {showModal && (
                <ConfirmModal
                    onConfirm={handleSubmit}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default ExamPage;
