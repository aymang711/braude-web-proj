import React, { useRef } from "react";
import { Container } from "reactstrap";
import {motion} from "framer-motion"
import {Link, useNavigate ,NavLink} from 'react-router-dom'
import userIcon from '../../assests/images/user-icon.png'
import '../../styles/ProfNav.css'
import { useLogout } from "../../custom-hook/useLogout";
import { useAuthContext } from "../../custom-hook/useAuthContext";

const ProfNav = () => {
  const {logout} = useLogout();
  const {user} =useAuthContext();
  
  const menuRef = useRef();
  const profileActionRef = useRef(null)
  const navigate = useNavigate()

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navLinks = [
    {
      path:"students",
      display:"Students"
  },
    {
      path:"students/courses",
      display:"Courses"
  },
  {
      path:"students/assignments",
      display:"Assignments"
  },
  {
    path:"students/submissions",
    display:"Submissions"
  },
  {
    path:"students/grades",
    display:"Grades"
  },

  {
      path:"students/about",
      display:"About"
  },
 
  ];

  const handleLogout =()=>{
    logout();
    navigate('/home')
     
  }
  const toggleProfileActions = ()=>{ profileActionRef.current.classList.toggle('show__profileActions');
  
}
  return (<header className="header">
    <Container>
     <div className="navigation d-flex align-items-center justify-content-space-around">
          <div className="logo">
            <h2 className=" d-flex align-items-center">
              <i class="ri-pantone-line"></i> Professor.
            </h2>
      </div>

      <div className="nav nav__prof ">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink to ={item.path} className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                  </li>
                ))}

                <div className='nav__right pb-3'>
                <motion.img whileTap={{scale:1.2}}
                 src={userIcon}
                 alt=" " 
                 onClick={toggleProfileActions} />

                <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                <span onClick={handleLogout}> LogOut</span>
                      
                </div>
             
                </div>
                </ul>
            </div>
            </div>

            <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>

          </div>
     
    
    </Container>

  </header>
  )
}

export default ProfNav;