import React from 'react'
import Header from '../Header/Header'
import Router from '../../Router/Router'
import Home from '../../pages/students-pages/Home'
import HeroSection from '../Hero-section/HeroSection'
import Footer from '../Footer/Footer'
import ProfNav from '../../pages/professor-pages/ProfNav'
import StuNav from '../../pages/students-pages/StuNav'
import { useLocation } from 'react-router-dom'

const Layout = () => {
  const location =useLocation()
  return (<> 

{
      // location.pathname.startsWith('/dashboard') ? <AdminNav/> : <Header/>
      location.pathname.startsWith('/students') ? <ProfNav/> :location.pathname.startsWith('/welcomeStudent') ? <StuNav/> : <Header/>
    }
  {/* <StuNav/> */}
  {/* <ProfNav/> */}
  {/* <Header/> */}
  {/* <HeroSection/> */}
  <Router/>
  <Footer/>
  </>
 
  )
}

export default Layout