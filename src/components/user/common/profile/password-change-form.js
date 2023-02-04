import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import PasswordInput from "../../../common/password-input/password-input";

const PasswordChangeForm = () => {

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    };

    const validationSchema = Yup.object({

    });

    const onSubmit = async (values) => {


        try {


        } catch (err) {

        } finally {

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
                <Form.Label>Current Password</Form.Label>
                <PasswordInput
                    {...formik.getFieldProps("oldPassword")}
                    isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
                    isvalid={formik.touched.oldPassword && !formik.errors.oldPassword}
                    error={formik.errors.oldPassword}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <PasswordInput
                    {...formik.getFieldProps("newPassword")}
                    isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                    isvalid={formik.touched.newPassword && !formik.errors.newPassword}
                    error={formik.errors.newPassword}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password Confirm</Form.Label>
                <PasswordInput
                    {...formik.getFieldProps("confirmNewPassword")}
                    isInvalid={
                        formik.touched.confirmNewPassword &&
                        formik.errors.confirmNewPassword
                    }
                    isvalid={
                        formik.touched.confirmNewPassword &&
                        !formik.errors.confirmNewPassword
                    }
                    error={formik.errors.confirmNewPassword}
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                disabled="true"
            >
                Update
            </Button>
        </Form>
    )
}

export default PasswordChangeForm