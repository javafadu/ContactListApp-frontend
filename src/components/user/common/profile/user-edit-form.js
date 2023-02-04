import React from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";

const AuthUserEditForm = ({ user }) => {


  const initialValues = {
    name: user.name,
    email: user.email,
    registerDate: user.registerDate,
    roles: user.roles

  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    registerDate: Yup.string().required("Please enter registration date"),
  });

  const onSubmit = async () => {

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
        <Form.Label>Name</Form.Label>
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
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          disabled
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
        <Form.Label>Registration Date</Form.Label>
        <Form.Control
          disabled
          type="dateTime"
          {...formik.getFieldProps("registerDate")}
          isInvalid={formik.touched.registerDate && formik.errors.registerDate}
          isValid={formik.touched.registerDate && !formik.errors.registerDate}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.registerDate}
        </Form.Control.Feedback>
      </Form.Group>


      <Button variant="primary" type="submit" disabled="true">

        Update
      </Button>
    </Form>
  )
}

export default AuthUserEditForm