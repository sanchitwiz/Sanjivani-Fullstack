import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import UserLogin from './pages/Login/UserLogin';
import HospitalLogin from './pages/Login/HospitalLogin';
import SignUp from './pages/Login/SignUp';
import ForgotPassword from './pages/Login/ForgotPassword';
import Dashboard from './pages/Hospital/Dashboard';
import AmbulanceTracking from './pages/AmbulaceTracking/AmbulanceTracking';
import ScanYourLabReports from './pages/ScanYourLabReports/ScanYourLabReports';
import HospitalList from './pages/HospitalSearch/HospitalList';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import HomeSection from './components/HeroSlider';
import Services from './components/Services';
import SearchFacilitiesNearby from './pages/Facilities/SearchFacilitiesNearby';
import SearchForEmergency from './pages/FirstAid/SearchForEmergency';
import WomenConditions from './pages/WomenSection/WomenConditions'
import FAQs from './components/FAQs';
import Footer from './components/Footer';

const App = () => {
  const [sharedValue, setSharedValue] = useState(false);
  const [sharedEmail, setSharedEmail] = useState('');
  const [adminSharedEmail, setAdminSharedEmail] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('userToken');
      const storedAdminEmail = localStorage.getItem('adminSharedEmail');
      if (token) {
        setSharedValue(true);
        if (storedAdminEmail) {
          setAdminSharedEmail(storedAdminEmail);
          console.log('adminSharedEmail set from localStorage:', storedAdminEmail); // Debug log
        }
      } else {
        setSharedValue(false);
        setAdminSharedEmail('');
      }
    };

    checkLoginStatus();
  }, []);

const AnimatedRoutes = ({ sharedValue, setSharedValue, sharedEmail, setSharedEmail, adminSharedEmail, setAdminSharedEmail }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to track if navigation is forward or backward
  const [isForward, setIsForward] = useState(true);

  useEffect(() => {
    // Detect when the user goes back or forward
    const handlePopState = (event) => {
      setIsForward(event.state ? false : true); // When `popstate` occurs, it's a backward navigation.
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const slideTransition = {
    forward: {
      initial: { x: "100vw", opacity: 0 }, // Slide in from right
      animate: { x: 0, opacity: 1 },       // Slide into place
      exit: { x: "-100vw", opacity: 0 },   // Slide out to the left
    },
    backward: {
      initial: { x: "-100vw", opacity: 0 }, // Slide in from left
      animate: { x: 0, opacity: 1 },        // Slide into place
      exit: { x: "100vw", opacity: 0 },     // Slide out to the right
    },
    transition: { duration: 0.2 } // Animation duration
  };

  // Choose the correct transition direction based on navigation state
  const selectedTransition = isForward ? slideTransition.forward : slideTransition.backward;

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <>
                <Navbar sharedValue={sharedValue} setSharedValue={setSharedValue} sharedEmail={sharedEmail}/>
                <HomeSection />
                <Services />
                <SearchFacilitiesNearby />
                <SearchForEmergency />
                <FAQs />
                <Footer />
              </>
            </motion.div>
          }
        />
        <Route path='/profile' element={            
          <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
            <Navbar />
            <Profile sharedEmail={sharedEmail}/>
        </motion.div>}
        />
        <Route
          path="/user-login"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <UserLogin sharedValue={sharedValue} setSharedValue={setSharedValue} setSharedEmail={setSharedEmail}/>
            </motion.div>
          }
        />
        <Route
          path="/hospital-login"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <HospitalLogin setAdminSharedEmail={setAdminSharedEmail}/>
            </motion.div>
          }
        />
        <Route
          path="/signup"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <SignUp />
            </motion.div>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <ForgotPassword />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <Dashboard adminSharedEmail={adminSharedEmail}/>
            </motion.div>
          }
        />
        <Route
          path="/ambulance-tracking"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <AmbulanceTracking />
            </motion.div>
          }
        />
        <Route
          path="/scan-your-reports"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <ScanYourLabReports />
            </motion.div>
          }
        />
        <Route
          path="/search-hospital"
          element={
            <motion.div
              initial={selectedTransition.initial}
              animate={selectedTransition.animate}
              exit={selectedTransition.exit}
              transition={slideTransition.transition}
            >
              <HospitalList isLoggedIn={sharedValue} adminSharedEmail={adminSharedEmail} />
            </motion.div>
          }
        />
        <Route 
          path="/women-conditon"
          element={<WomenConditions />}
        />
      </Routes>
    </AnimatePresence>
  );
};

  return (
    <Router>
      <div className="drag-none select-none">
        <AnimatedRoutes 
          sharedValue={sharedValue} 
          setSharedValue={setSharedValue} 
          sharedEmail={sharedEmail} 
          setSharedEmail={setSharedEmail}
          adminSharedEmail={adminSharedEmail}
          setAdminSharedEmail={setAdminSharedEmail}
        />
      </div>
    </Router>
  );
};

export default App;
