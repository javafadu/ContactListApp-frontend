import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { settings } from "../../../../utils/settings";
import "./footer.scss";

const Footer = () => {
  return (
    <Container className="footer" fluid>
      <Container>
        <Row>
          <Col className="text-center text-md-right" md={6}>
            <h4>Contact List App</h4>

            <p>{settings.address}</p>
            <p>{settings.siteUrl}</p>


          </Col>
          <Col className="text-center text-md-right" md={6}>
            <h4>7/24 Contact With Us</h4>
            <p>{settings.email}</p>
            <p>{settings.phone1}</p>


          </Col>
        </Row>

      </Container>
    </Container>
  )
};

export default Footer;
