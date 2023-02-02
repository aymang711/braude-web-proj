import React, { useRef } from "react";
import { Container } from "reactstrap";
import './header.css'
import userIcon from '../../assests/images/user-icon.png'
import {motion} from "framer-motion"
import {Link, useNavigate ,NavLink} from 'react-router-dom'

const navLinks = [
  {
    path:"home",
    display:"Home"
},

{
    path:"about",
    display:"About"
},
{
  path:"contact",
  display:"Contact"
},



];

const Header = () => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex align-items-center">
              <i class="ri-pantone-line"></i> Professor.
            </h2>
          </div>

          {/* <div className="nav d-flex align-items-center justify-content-between gap-3"> */}
          <div className="nav d-flex align-items-center justify-content-between">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink to ={item.path} className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                  </li>
                ))}

                <div className="nav__right">
                {/* <button type='submit' className="btn-login"><Link to='/login'>Login</Link></button> */}
                
                <i class="ri-login-circle-fill fs-5"><Link to='/login'>Login</Link></i>
             
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
  );
};

export default Header;