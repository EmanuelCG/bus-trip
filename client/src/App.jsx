import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BusPage } from './pages/BusPage'
import Navigation from './components/Navigation'
import { Home } from './pages/HomePage'
import BreadCrumb from './components/BreadCrumb'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { PassengerPage } from './pages/PassengerPage'
import LocationPage from './pages/LocationPage'
import { JourneyPage } from './pages/JourneyPage'
import { DriverPage } from './pages/DriverPage'
import { JourneyDriverPage } from './pages/JourneyDriverPage'
import { SeatPage } from './pages/SeatPage'
function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <BreadCrumb />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Navigate to="/home" />}></Route>
        <Route path='/bus' element={<BusPage />}></Route>
        <Route path='/home' element={<Home />} />
        <Route path='/passenger' element={<PassengerPage />} />
        <Route path='/location' element={<LocationPage />} />
        <Route path='/journey' element={<JourneyPage />} />
        <Route path='/driver' element={<DriverPage />} />
        <Route path='/journey-driver' element={<JourneyDriverPage />} />
        <Route path='/seat' element={<SeatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
