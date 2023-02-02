import React from 'react'
import './contact.css'
import ContactImg from '../../assests/images/hero-img1.png'

const Contact = () => {
  return (
    <div className='container-contact'>
     
      <div className="content">
       
      <h1>Contact Us</h1>
      <div className='contact__options'>
      <article className='contact__option'>
           <i class="ri-mail-fill"></i>
           <h4>Email</h4>
           <h5>JohnSmith@hotmail.com</h5>
           <a href='mailto:john.com' target='_blank'>Send a message</a>
          </article>

          <article className='contact__option'>
          <i class="ri-phone-fill"></i>
           <h4>Phone</h4>
           <h5>John Smith</h5>
           <a href='https://m.me/john'>Send a message</a>
          </article>

          <article className='contact__option'>
          <i class="ri-whatsapp-fill"></i>
           <h4>Whatsapp</h4>
           <h5>+910005555555555</h5>
           <a href=''>Send a message</a>
          </article>
          </div>
     
      </div>
      <div className="img-content">
        <img  src ={ContactImg} alt=""  />
      </div>
    </div>
  )
}

export default Contact