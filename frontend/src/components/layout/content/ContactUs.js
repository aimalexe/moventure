import React, { useState } from 'react';
import Styles from '../../../styles/ContactUs.module.css';
// import axios from 'axios';
// import { simpleUrl } from '../../../layout/small_components/Url';
// import { mySwal } from '../../../layout/small_components/Alert';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
    };

    return (
        <div className={Styles.contactUsContainer}>
            <h1 id='contact' >Contact Us</h1>
            <form className={Styles.contactForm} onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default ContactUs;
