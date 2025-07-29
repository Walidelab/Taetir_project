import { Routes, Route, Navigate } from "react-router-dom";
import SigninPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
import ChooseRole from "./pages/ChooseRole";
import TaetirProfileForm from "./pages/ProfileCreatePage";
import MentorProfilePage from "./pages/MentorProfilePage";
import ForgotPassword from "./pages/ForgotPassword";
import OtpPage from "./pages/OtpPage";
import ChangePassword from "./pages/ChangePassword";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <div className="ml-64">
            <Header />
            <main className="p-6">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/find-mentors" element={<FindMentors />} />
                <Route path="/connections" element={<MyConnections />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                {/* Optional fallback */}
                <Route path="*" element={<div>404 - Not Found</div>} />
              </Routes>
            </main>
          </div>
        </div>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/profile-create" element={<TaetirProfileForm />} />
        <Route path="/mentor-profile" element={<MentorProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </div>
  );
}

export default App;
