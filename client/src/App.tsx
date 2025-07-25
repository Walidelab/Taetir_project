import { Routes , Route , Navigate } from 'react-router-dom'
import SigninPage from './pages/SignInPage'
import SignupPage from './pages/SignupPage'
import ChooseRole from './pages/ChooseRole'
import TaetirProfileForm from './pages/ProfileCreatePage'
import MentorProfilePage from './pages/MentorProfilePage'
import ForgotPassword from './pages/ForgotPassword'
import OtpPage from './pages/OtpPage'
import ChangePassword from './pages/ChangePassword'
import './App.css'

function App() {
  return (
    <Routes>
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
  )
}

export default App
