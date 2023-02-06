import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { getContactWithId } from '../../../api/contact-service';
import Spacer from '../../common/spacer/spacer';
import "./contact-detail.scss";

const ContactDetail = () => {
    const location = useLocation();
    let word = location.pathname.split("/");
    let contactId = (word[2]);

    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState({});


    const loadData = async () => {
        try {
            const resp = await getContactWithId(contactId);
            setContact(resp.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadData();
    }, []);



    return (
        <div className="contact-detail">
            <Col lg={2}></Col>
            <Col lg={4}>
                <div className="contact-detail">
                    <div className="contact-card">
                        <img src={contact.imageLink} alt={contact.contactName} />


                        <h2 className="title">{contact.contactName}</h2>


                    </div>
                </div>
            </Col>
            <Col lg={4}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto et inventore, iure saepe delectus voluptatibus sed iusto, adipisci dolor aperiam quae at similique natus quo! Nam assumenda facere commodi fuga.
                Necessitatibus rem dicta corporis aliquam ipsa exercitationem perspiciatis, accusantium ipsum quasi commodi reprehenderit soluta dolores eius eum rerum. Et praesentium natus corrupti? Quidem nobis culpa sunt facere, consequatur voluptates adipisci.</Col>
            <Col lg={2}></Col>


        </div>

    )
}

export default ContactDetail