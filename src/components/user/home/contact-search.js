import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Spacer from '../../common/spacer/spacer';
import "./contacts.scss";

const ContactSearch = () => {

    const [input, setInput] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    let navigate = useNavigate();
    const handleSubmit = () => {
        let path = `/?q=${input}`;
        navigate(path);
        window.location.reload();
    };

    return (
        <>
            <Spacer height={10} />
            <Container className="contact-search-container">
                <Row>
                    <div className="input-group">
                        <input
                            type="text"
                            maxLength={30}
                            className="form-control border-primary my-2 mx-2"
                            placeholder="Search Name"
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
                        <div className="input-group-append">
                            <button
                                disabled={isButtonDisabled}
                                type="submit"
                                value="Submit"
                                className="btn btn-info my-2 px-3 px-lg-5"
                                onClick={handleSubmit}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </Row>
            </Container>



        </>
    )
}

export default ContactSearch