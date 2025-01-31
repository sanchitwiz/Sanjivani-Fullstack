import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomeSection from './components/HeroSlider'
import Services from './components/Services'
import FAQs from './components/FAQs'
import SearchFacilitiesNearby from './pages/Facilities/SearchFacilitiesNearby'
import SearchForEmergency from './pages/FirstAid/SearchForEmergency'
import Dashboard from './pages/Hospital/Dashboard'

const Index = () => {
  const [sharedValue, setSharedValue] = useState('');

  return (
    <div>
      <Navbar/>
      <HomeSection />
      <Services />
      <SearchFacilitiesNearby />
      <SearchForEmergency />
      <FAQs />
      <Footer />
    </div>
  )
}

export default Index
