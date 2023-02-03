import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../../assets/img/logo-widen.png";
import { settings } from "../../../../utils/settings";
import AuthMenu from "./auth-menu";
import "./header.scss";

const Header = () => {
  return (

    <Navbar bg="light" expand="lg" className="sticky-top home-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" title={settings.siteName}>
          <img src={logo} alt={settings.siteName} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"

          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>

          </Nav>

          <AuthMenu />

        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
};

export default Header;
