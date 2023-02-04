import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Form,
    Button,
    Row,
    Col,
    ButtonGroup,
    Badge,
    Spinner,
    Alert,
} from "react-bootstrap";
import {
    getUserWithId,
    updateUser,
    deleteUser,
} from "../../../api/user-service";
import { questionConfirmCancel, toast } from "../../../utils/functions/swal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Loading from "../../common/loading/loading";

import { useSelector } from "react-redux";

const UserEditForm = () => {

    const { isUserLogin, user } = useSelector((state) => state.auth);

    let access = false;

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("id");

    const [infoUser, setInfoUser] = useState({});
    const [userBasicCheck, setUserBasicCheck] = useState(false);
    const [userCustomerCheck, setUserCustomerCheck] = useState(false);
    const [userManagerCheck, setUserManagerCheck] = useState(false);
    const [userAdminCheck, setUserAdminCheck] = useState(false);

    if (user.roles.includes("Admin")) {
        access = true;
    }

    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter a name"),
        email: Yup.string()
            .min(10, "Too short")
            .max(180, "Too Long")
            .email()
            .required("Please enter a email"),
    });

    const onSubmit = async (values) => {
        setSaving(true);

        try {
            const payload = { ...values };
            delete payload.roles;

            const updatedRoles = [];
            const userBasicObje = {
                id: 1,
                name: "ROLE_BASIC",
            };
            const userCustomerObje = {
                id: 2,
                name: "ROLE_CUSTOMER",
            };
            const userManagerObje = {
                id: 3,
                name: "ROLE_MANAGER",
            };
            const userAdminObje = {
                id: 4,
                name: "ROLE_ADMIN",
            };


            if (userBasicCheck) updatedRoles.push(userBasicObje);
            if (userCustomerCheck) updatedRoles.push(userCustomerObje);
            if (userManagerCheck) updatedRoles.push(userManagerObje);
            if (userAdminCheck) updatedRoles.push(userAdminObje);

            payload.roles = updatedRoles;

            await updateUser(userId, payload);
            toast("User was updated", "success");
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

    const loadData = async () => {
        setLoading(true);

        try {
            const resp = await getUserWithId(userId);

            setInitialValues(resp.data);
            const roles = resp.data.roles;

            if (roles.includes("Basic")) setUserBasicCheck(true);
            if (roles.includes("Customer")) setUserCustomerCheck(true);
            if (roles.includes("Manager")) setUserManagerCheck(true);
            if (roles.includes("Admin")) setUserAdminCheck(true);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async () => {
        setDeleting(true);
        try {
            /* delete user */
            await deleteUser(userId);
            toast("User was deleted", "success");

            navigate(-1);
        } catch (err) {
            toast(err.response.data.message, "error");
        } finally {
            setDeleting(false);
        }
    };

    const handleDelete = () => {
        questionConfirmCancel(
            "Are you sure to delete?",
            "You won't be able to revert this!"
        ).then((result) => {
            if (result.isConfirmed) {
                removeUser();
            }
        });
    };

    const isError = (field) => {
        return formik.touched[field] && formik.errors[field];
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return loading ? (
        <Loading />
    ) : (
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
                        <Form.Label>User Roles</Form.Label>
                        {["checkbox"].map((type) => (
                            <div
                                key={`inline-${type}`}
                                className="mb-3 square border py-3 d-flex justify-content-between"
                            >
                                <Form.Check
                                    inline
                                    label="Basic"
                                    name="group1"
                                    checked={userBasicCheck}
                                    onChange={() => setUserBasicCheck(!userBasicCheck)}
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Customer"
                                    checked={userCustomerCheck}
                                    onChange={() => setUserCustomerCheck(!userCustomerCheck)}
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                <Form.Check
                                    inline
                                    label="Manager"
                                    name="group1"
                                    checked={userManagerCheck}
                                    onChange={() => setUserManagerCheck(!userManagerCheck)}
                                    type={type}
                                    id={`inline-${type}-3`}
                                />


                                <Form.Check
                                    inline
                                    label="Admin"
                                    name="group1"
                                    checked={userAdminCheck}
                                    onChange={() => setUserAdminCheck(!userAdminCheck)}
                                    type={type}
                                    id={`inline-${type}-5`}
                                />
                            </div>
                        ))}
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </fieldset>

            {
                <Alert variant="danger" className="mt-5">
                    {access ? "" : `Only administrator  can update this user `}
                </Alert>
            }

            <div className="text-end">
                <ButtonGroup aria-label="Basic example">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                    {access && (
                        <>
                            <Button variant="primary" type="submit" disabled={saving}>
                                {saving && <Spinner animation="border" size="sm" />} Update
                            </Button>
                        </>
                    )}

                    {access ? (
                        !initialValues.builtIn ? (
                            <>
                                <Button
                                    variant="danger"
                                    type="button"
                                    disabled={deleting}
                                    onClick={handleDelete}
                                >
                                    {deleting && <Spinner animation="border" size="sm" />} Delete
                                </Button>
                            </>
                        ) : (
                            ""
                        )
                    ) : (
                        ""
                    )}
                </ButtonGroup>
            </div>
        </Form>
    );
}

export default UserEditForm