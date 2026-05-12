import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Footer from "./components/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./auths/protectedRoute";
import NavbarandAside from "./components/navbarresponsive";
import DashboardFooter from "./components/dashboardFooter";
import Leaderboard from "./pages/leaderboard";
import PayButton from "./pages/pay";
import VerifyPayment from "./pages/verify";
import ExamPage from "./pages/exampage";
import Results from "./pages/results";
import Profile from "./pages/profile";
import PaymentSuccess from "./trash/paySuccess";
import Settings from "./pages/settings";
import FreeTestPage from "./pages/freetestPage";
import ProfilePage from "./pages/settings";
import ChallengePage from "./pages/challenge";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import AdministrationPage from "./pages/administrations";
import LearnMorePage from "./pages/learnmore";



function App() {
  return (
    <BrowserRouter>

      {/* ✅ TOAST SYSTEM (GLOBAL - ALWAYS VISIBLE) */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#111",
            borderRadius: "10px",
            padding: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          },
          success: {
            style: {
              borderLeft: "5px solid #22c55e",
            },
          },
          error: {
            style: {
              borderLeft: "5px solid #ef4444",
            },
          },
        }}
      />

      {/* ✅ YOUR ROUTES */}

      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Navbar />
            <Signup />

          </>
        } />

        <Route path="/learnmore" element={
          <>
            <Navbar />
            <LearnMorePage />

          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <ContactPage />

          </>
        } />

        <Route path="/administrations" element={
          <>
            <Navbar />
            <AdministrationPage />

          </>
        } />

        <Route path="/about" element={
          <>
            <Navbar />
            <AboutPage />

          </>
        } />

        <Route path="/login" element={
          <>
            <Navbar />
            <Login />
          </>
        } />


        <Route path="/dashboard" element={
          <ProtectedRoute>
            <NavbarandAside />
            <Dashboard />
            <DashboardFooter />
          </ProtectedRoute>
        } />




        <Route path="/exam" element={
          <ProtectedRoute>
            <ExamPage
            />
          </ProtectedRoute>
        } />

        <Route path="/results" element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        } />

        <Route path="/success" element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <NavbarandAside />
            <Profile />
            <DashboardFooter />
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <NavbarandAside />
            <ProfilePage />
            <DashboardFooter />
          </ProtectedRoute>
        } />


        <Route path="/freetest" element={
          <ProtectedRoute>
            <NavbarandAside />
            <FreeTestPage />
            <DashboardFooter />
          </ProtectedRoute>
        } />

        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <NavbarandAside />
            <Leaderboard />
            <DashboardFooter />
          </ProtectedRoute>
        } />

        <Route path="/pay" element={
          <ProtectedRoute>
            <NavbarandAside />
            <PayButton />
            <DashboardFooter />
          </ProtectedRoute>
        } />

        <Route path="/verify" element={
          <ProtectedRoute>
            <VerifyPayment />
          </ProtectedRoute>
        } />

        <Route path="/challenge" element={
          <ProtectedRoute>
            <NavbarandAside />
            <ChallengePage />
            <DashboardFooter />
          </ProtectedRoute>
        } />

      </Routes>



    </BrowserRouter>
  );
}

export default App;