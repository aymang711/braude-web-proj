import React from 'react'
import './Footer.css'
import {Container ,Row,Col} from 'reactstrap'



const Footer = () => {
const year = new Date().getFullYear()
  return (<footer className="footer">
    <Container>
        <Row>
            <Col lg='6' className='' md='6'>
                <div className='footer-logo'>
                <h3 className='text-white'>Professor.</h3>

                </div>
            </Col>
         
            <Col lg='6'>
            <div className='header__socials d-flex align-items-center gap-3'>
              <a href='https://linkedin.com' target='_blank'><i class="ri-linkedin-box-fill"></i></a>
              <a href='https://github.com' target='_blank'><i class="ri-github-fill"></i></a>
              <a href='https://dribble.com' target='_blank'><i class="ri-facebook-box-fill"></i></a>
             </div>
            </Col>
        </Row>
    </Container>
  </footer>
  )
}

export default Footer