import { Routes, Route, Navigate } from 'react-router-dom';


import DashboardLayout from "@/layouts/dashboardLayout"; 


import SigninPage from './pages/auth/SignInPage';
import SignupPage from './pages/auth/SignupPage';
import ChooseRole from './pages/auth/ChooseRole';
import { CompleteProfilePage } from './pages/auth/CompleteProfilePage';
import MentorProfilePage from './pages/auth/MentorProfilePage';
import ForgotPassword from './pages/auth/ForgotPassword';
import OtpPage from './pages/auth/OtpPage';
import ChangePassword from './pages/auth/ChangePassword';
import './App.css';
import DashboardPage from './pages/app/Dashboard';
import FindMentors from './pages/app/FindMentor';
import Profile from './pages/app/Profile';
import MyConnections from './pages/app/Connections';
import Calendar from './pages/app/Calendar';
import Messages from './pages/app/Message';
import Feedbacks from './pages/app/Feedback';




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
      <Route path='/complete-setup' element= {<CompleteProfilePage />} />


      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mentors" element={<FindMentors />} />
        <Route path="/connections" element={<MyConnections />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

    </Routes>
  );
}

export default App;
