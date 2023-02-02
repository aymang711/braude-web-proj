import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '../pages/students-pages/Home'
import Login from '../components/Login/Login'
import Courses from '../pages/professor-pages/CoursesP'
import Students from '../pages/professor-pages/Students'
import AssignmentP from '../pages/professor-pages/AssignmentP'
import GradesP from '../pages/professor-pages/GradesP'
import SubmissionP from '../pages/professor-pages/SubmissionP'
import Welcome from '../pages/students-pages/Welcome'
import CoursesS from '../pages/students-pages/CoursesS'
import AssignmentsS from '../pages/students-pages/AssignmentsS'
import GradesS from '../pages/students-pages/GradesS'
import About from '../components/About/About'
import Contact from '../components/contact/Contact'
import ProtectedRoute from './ProtectedRoute'




const Router = () => {
  return <Routes>
    <Route path="/" element={<Navigate to='home' />}/>
    <Route path='home' element={<Home/>}/>
    <Route path='contact' element={<Contact/>}/>
    <Route path='about' element={<About/>}/>
    <Route path='login' element={<Login/>}/>

    <Route path='/*' element={<ProtectedRoute/>}>
    <Route path='students/courses' element={<Courses/>}/>
    <Route path='students' element={<Students/>}/>
    <Route path='students/assignments' element={<AssignmentP/>}/>
    <Route path='students/grades' element={<GradesP/>}/>
    <Route path='students/submissions' element={<SubmissionP/>}/>
    <Route path='students/about' element={<About/>}/>
   
    <Route path='welcomeStudent' element={<Welcome/>}/>
    <Route path='welcomeStudent/coursesStudent' element={<CoursesS/>}/>
    <Route path='welcomeStudent/assignmentStudent' element={<AssignmentsS/>}/>
    <Route path='welcomeStudent/gradeStudent' element={<GradesS/>}/>
    <Route path='welcomeStudent/about' element={<About/>}/>
    </Route>

    {/* <Route path='home' element={<Home/>}/> */}

  </Routes>
 
}

export default Router