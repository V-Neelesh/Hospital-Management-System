import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import ApplicationForm from './pages/applications/form'
import About from './pages/about/about'
import Home from './pages/home/home'
import AppoinmentHandler from './pages/admin/appoinment_handler'
import AppointmentStatus from './pages/Appoinment_Statues/status'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/apply-appointment" element={<ApplicationForm />} />
      <Route path="/status" element={<AppointmentStatus />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<AppoinmentHandler />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
