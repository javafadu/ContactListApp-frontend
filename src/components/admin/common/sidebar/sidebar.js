import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import adminIcon from "../../../../assets/img/find_user.png";
import {
  RiHome3Line,
  RiUser3Line,
  RiFileList3Line,
  RiLogoutCircleRLine,
  RiDashboardLine,
} from "react-icons/ri";
import { logout } from "../../../../store/slices/auth-slice";
import { questionConfirmCancel } from "../../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    questionConfirmCancel("Are you sure you want to log out?").then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        secureLocalStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <Navbar bg="dark" expand="lg" className="admin-navbar">
      <Container>
        <div className="title-icon">
          <img src={adminIcon} alt="" className="img-fluid" />
        </div>
        <div className="title-text">
          <h5>{`${user.email}`}</h5>
          <p>
            {user.roles[0]} {user.roles[1]} {user.roles[2]}
            {user.roles[3]}
            {user.roles[4]}
            {user.roles[5]}
          </p>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">
              <RiDashboardLine /> Admin Home
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users">
              <RiUser3Line /> Users
            </Nav.Link>

            <Nav.Link as={Link} to="/admin/contacts">
              <RiFileList3Line /> Contact List
            </Nav.Link>

            <Nav.Link as={Link} to="/">
              <RiHome3Line /> Web Site
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <RiLogoutCircleRLine /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SideBar;