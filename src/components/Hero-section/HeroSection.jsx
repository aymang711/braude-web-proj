import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/hero-img.png";
import "./heroSection.css";


const HeroSection = () => {
  return (
    <section className="hero-sec">
      <Container>
        <Row>
          <Col lg="8" md="8">
            <div className="hero__content">
              <h2 className="mb-4 hero__title ">
              <span className="hero-text ">Teaching</span> <br /> is the greatest act of  <br /> <span className="hero-text"> optimism.</span>
              </h2>
            </div>

          </Col>

          <Col lg="4" md="4">
           
            <div className="overlayInfo">
              <p className="fw-bold">Professor Name : John Smith </p>
              <p>University: universityName </p>
              <p>Email: John@jhon.com</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
