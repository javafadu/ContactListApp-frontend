import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import logoWhite from "../../../../assets/img/logo-widen-light.png";
import { settings } from '../../../../utils/settings';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import "./user-auth.scss";

const UserAuth = () => {

    const [searchParams] = useSearchParams();
    const [defaultTab, setDefaultTab] = useState("login");
    const navigate = useNavigate();

    useEffect(() => {
        setDefaultTab(searchParams.get("type") || "login");
    }, [searchParams]);


    return (
        <Container fluid className="auth">
            <Row>
                <Col lg={7}>
                    <img src={logoWhite} alt={settings.siteName} />
                    <div className="toolbar">
                        <RiCloseCircleLine onClick={() => navigate(-1)} />{" "}

                        <AiFillHome onClick={() => navigate("/")} />
                    </div>
                </Col>
                <Col lg={5}>
                    <Card>
                        <Card.Body>
                            <Tabs
                                activeKey={defaultTab}
                                onSelect={(k) => setDefaultTab(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="login" title="Login">
                                    <LoginForm />
                                </Tab>
                                <Tab eventKey="register" title="Register">
                                    <RegisterForm setDefaultTab={setDefaultTab} />
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UserAuth