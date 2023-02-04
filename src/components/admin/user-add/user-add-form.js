import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Spinner, Row, Col, ButtonGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../utils/functions/swal";
import { createUser } from "../../../api/user-service";
import { useSelector } from "react-redux";
import PasswordInput from "../../common/password-input/password-input";

const UserAddForm = () => {

    const { isUserLogin, user } = useSelector((state) => state.auth);
    let access = true;

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const [initialValues] = useState({
        name: "",
        email: "",
        password: "",

    });

    const validationSchema = Yup.object({

        name: Yup.string().required("Please enter a name"),
        email: Yup.string().email().required("Please enter a email"),
        password: Yup.string()
            .required("Please enter your password")
            .min(8, "Must be at least 8 characters")
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number"),
        confirmPassword: Yup.string()
            .required("Please re-enter a password")
            .oneOf([Yup.ref("password")], "Password fields doesn't match"),
    });

    const onSubmit = async (values) => {
        setSaving(true);

        try {
            const payload = { ...values };
            delete payload.roles;

            const updatedRoles = [];

            const memberObje = {
                id: 1,
                name: "ROLE_BASIC",
            };

            updatedRoles.push(memberObje);

            payload.roles = updatedRoles;

            await createUser(payload);
            toast("User was created", "success");
            navigate(-1);
        } catch (err) {
            console.log(err);
            toast(err.response.data.message, "error");
        } finally {
            setSaving(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    return (
        <Form noValidate onSubmit={formik.handleSubmit} className="px-2">
            <fieldset disabled={!access}>
                <Row>

                    <Form.Group as={Col} lg={6} className="mb-3">
                        <Form.Label>Name and Surname</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps("name")}
                            isInvalid={formik.touched.name && formik.errors.name}
                            isValid={formik.touched.name && !formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group as={Col} lg={6} className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            {...formik.getFieldProps("email")}
                            isInvalid={formik.touched.email && formik.errors.email}
                            isValid={formik.touched.email && !formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} lg={6} className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <PasswordInput
                            {...formik.getFieldProps("password")}
                            isInvalid={formik.touched.password && formik.errors.password}
                            isValid={formik.touched.password && !formik.errors.password}
                            error={formik.errors.password}
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg={6} className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <PasswordInput
                            {...formik.getFieldProps("confirmPassword")}
                            isInvalid={
                                formik.touched.confirmPassword && formik.errors.confirmPassword
                            }
                            isValid={
                                formik.touched.confirmPassword && !formik.errors.confirmPassword
                            }
                            error={formik.errors.confirmPassword}
                        />
                    </Form.Group>
                </Row>
            </fieldset>

            <div className="text-end">
                <ButtonGroup aria-label="Basic example">
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading && <Spinner animation="border" size="sm" />} Create
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </div>
            <div className="my-2">
                <h3>The created user role will be "Basic" as default</h3>
                <h6>
                    If you want to change it as  Admin, you need to update after
                    creation
                </h6>
            </div>
        </Form>
    )
}

export default UserAddForm