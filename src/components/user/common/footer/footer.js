import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { settings } from "../../../../utils/settings";
import "./footer.scss";
import { HiLocationMarker } from "react-icons/hi";
import { IoLogoChrome } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container className="footer" fluid>
      <Container>
        <Row>
          <Col className="text-center text-md-right" md={6}>
            <h4>Contact List App</h4>

            <p><span><HiLocationMarker /> </span>{settings.address}</p>
            <p><span><IoLogoChrome></IoLogoChrome> </span>{settings.siteUrl}</p>


          </Col>
          <Col className="text-center text-md-right" md={6}>

            <p><span><MdEmail /> </span>{settings.email}</p>
            <p><span><BsFillTelephoneInboundFill /> </span>{settings.phone1}</p>
            <p><Link to="/privacy-policy" title={settings.siteName}>---Privacy Policy ----</Link></p>


          </Col>
        </Row>

      </Container>
    </Container>
  )
};

export default Footer;
