import { Routes, Route, Navigate } from 'react-router-dom';


import DashboardLayout from "@/layouts/dashboardLayout"; 


import SigninPage from './pages/auth/SignInPage';
import SignupPage from './pages/auth/SignupPage';
import ChooseRole from './pages/auth/ChooseRole';
import TaetirProfileForm from './pages/app/ProfilePage';
import MentorProfilePage from './pages/auth/MentorProfilePage';
import ForgotPassword from './pages/auth/ForgotPassword';
import OtpPage from './pages/auth/OtpPage';
import ChangePassword from './pages/auth/ChangePassword';
import './App.css';
import DashboardPage from './pages/app/Dashboard';


const FindMentorsPage = () => <div className="bg-white p-6 rounded-lg shadow-md"><h1>Find Mentors</h1></div>;
const MyConnectionsPage = () => <div className="bg-white p-6 rounded-lg shadow-md"><h1>My Connections</h1></div>;
const MessagesPage = () => <div className="bg-white p-6 rounded-lg shadow-md"><h1>Messages</h1></div>;
const CalendarPage = () => <div className="bg-white p-6 rounded-lg shadow-md"><h1>Calendar</h1></div>;
const FeedbacksPage = () => <div className="bg-white p-6 rounded-lg shadow-md"><h1>Feedbacks</h1></div>;

const SettingsPage = () => <div className="bg-white p-6 rounded-lg shadow-md"><h1>Settings</h1></div>;


function App() {
  return (
    <Routes >

      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/mentor-profile" element={<MentorProfilePage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ChangePassword />} />
      <Route path="/otp" element={<OtpPage />} />


      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mentors" element={<FindMentorsPage />} />
        <Route path="/connections" element={<MyConnectionsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/feedbacks" element={<FeedbacksPage />} />
        <Route path="/profile" element={<TaetirProfileForm />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

    </Routes>
  );
}

export default App;
