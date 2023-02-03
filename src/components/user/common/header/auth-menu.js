import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../store/slices/auth-slice';
import { questionConfirmCancel } from '../../../../utils/functions/swal';
import "./auth-menu.scss";

const AuthMenu = () => {

    const { isUserLogin, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {

        questionConfirmCancel("Are you sure you want to log out?").then(result => {
            if (result.isConfirmed) {
                dispatch(logout());
                // make empty local storage
                navigate("/");
            }
        })


    }


    return (
        <div className='auth-menu'>
            {isUserLogin ?

                <Dropdown align="end">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {user.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

                        {user.roles.includes("Admin") && (
                            <>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to="/admin">Admin Panel</Dropdown.Item>
                            </>
                        )}
                    </Dropdown.Menu>
                </Dropdown>


                :

                <div >
                    <Button variant="light" as={Link} to="/auth" className="mx-2">Login</Button>
                    <Button variant="primary" as={Link} to="/auth">Register</Button>
                </div>


            }
        </div>
    )
}

export default AuthMenu