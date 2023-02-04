import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import AuthUserEditForm from './user-edit-form';
import PasswordChangeForm from './password-change-form';
import "./profile.scss";

const Profile = () => {

  const user = useSelector((state) => state.auth.user);

  return (
    <Container className="profile">
      <Row>
        <Col>
          <FaUserCircle size="120" />
          <h4>{`${user.name}`}</h4>
          <p>{user.email}</p>
          <p>{user.roles.map((e, index) => `role:${index + 1} ${e}`).join(' ')}</p>
        </Col>
        <Col>
          <h3>Update Profile</h3>
          <AuthUserEditForm user={user} />
        </Col>
        <Col>
          <h3>Update Password</h3>
          <PasswordChangeForm />
        </Col>
      </Row>
    </Container>
  )
}

export default Profile