import React, { useState } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import PasswordInput from "../../../common/password-input/password-input";
import { register } from '../../../../api/user-service';
import { toast } from '../../../../utils/functions/swal';
import { Button, Form, Spinner } from 'react-bootstrap';

const RegisterForm = ({ setDefaultTab }) => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().email().required("Please enter your email"),
        password: Yup.string()
            .required("Please enter your password")
            .min(8, "Must be at least 8 characters")
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number"),
        confirmPassword: Yup.string()
            .required("Please re-enter your password")
            .oneOf([Yup.ref("password")], "Password fields doesn't match"),
    });

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const resp = await register(values);
            toast("You're registered successfully!", "success");
            formik.resetForm();
            setDefaultTab("login");
        } catch (err) {
            toast(err.response.data.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <PasswordInput
                    {...formik.getFieldProps("password")}
                    isInvalid={formik.touched.password && formik.errors.password}
                    isValid={formik.touched.password && !formik.errors.password}
                    error={formik.errors.password}
                />
            </Form.Group>
            <Form.Group className="mb-3">
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
            <Button variant="primary" type="submit" disabled={loading}>
                {loading && <Spinner animation="border" size="sm" />} Register
            </Button>
        </Form>
    )
}

export default RegisterForm