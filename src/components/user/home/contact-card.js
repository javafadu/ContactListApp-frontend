import React from 'react'
import { Button, Card } from 'react-bootstrap';
import "./contacts.scss";

const ContactCard = (props) => {

    const { id, contactName, imageLink } = props;

    return (
        <Card className="contact-card">
            <img src={imageLink} alt={contactName} />

            <Card.Footer>
                <Button className="text-center fluid">{contactName}</Button>
            </Card.Footer>
        </Card>
    )
}

export default ContactCard

