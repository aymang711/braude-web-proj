import React from 'react'
import './about.css'
import { Button } from 'bootstrap'
import HeroImg from '../../assests/images/about-us.png'

const About = () => {
    return(
      
        <div className="about__container">
           
            <div className="content">
            <h1>About Us</h1>
             
            <h3>Professor Name : John Smith</h3>
         
          
            <div className="about__cards">
            <article className='about__card'>
          
              <h5>Experience</h5>
              <small>3+ Years Working</small>
            </article>
            <article className='about__card'>
           
              <h5>Courses</h5>
              <small>200+ Course</small>
            </article>
            <article className='about__card'>
          
              <h5>Students</h5>
              <small>500+ student</small>
            </article>
          </div>
          <p>Free Hours :  2-3 Pm daily </p>
           
          

          </div>
         

            
            <div className="imageAbout">
                <img src={HeroImg} alt="" className="src" />
            </div>

        </div>
        )



}
export default About