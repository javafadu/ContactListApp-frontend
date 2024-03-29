import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./users.scss";
import { BsSearch } from "react-icons/bs";

const UserSearch = () => {

    const [input, setInput] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    let navigate = useNavigate();
    const handleSubmit = () => {
        let path = `/admin/users?q=${input}`;
        navigate(path);
        window.location.reload();
    };

    const handleSubmitBookAdd = () => {
        let path = `/admin/add-user`;
        navigate(path);
    };

    return (
        <div className="search-box">
            <div className="input-group">
                <input
                    type="text"
                    maxLength={30}
                    className="form-control border-light my-2 mx-2"
                    placeholder="User Name or E-mail"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);

                        if (input.length < 2) {
                            setIsButtonDisabled(true);
                        } else {
                            setIsButtonDisabled(false);
                        }
                    }}
                />
                <div>
                    <button
                        disabled={isButtonDisabled}
                        type="submit"
                        value="Submit"
                        className="btn btn-info my-2 mx-0"
                        onClick={handleSubmit}
                    >
                        <BsSearch />
                    </button>
                    <button
                        type="submit"
                        value="Submit"
                        className="btn btn-primary my-2  mx-3"
                        onClick={handleSubmitBookAdd}
                    >
                        Add New User
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserSearch