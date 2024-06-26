import React, { useState } from 'react';
import Styles from '../../../styles/AddDistination.module.css';
import axios from 'axios';
import { simpleUrl } from '../small_components/Url';
import { mySwal } from '../small_components/Alert';
import { useNavigate } from 'react-router-dom';

function AddDestination({ addDestination }) {
    const  navg = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        city: '',
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
        if (!localStorage.getItem('x-auth-token')) {
            mySwal.fire({
                title: 'Unauthorized',
                text: 'You need to login to access this page',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        if(formData.name === '' || formData.description === '' || formData.country === '' || formData.city === ''){
            mySwal.fire({
                title: 'Error',
                text: 'All fields are required',
                icon: 'error',
                showConfirmButton: true,
                timer: 2000
            });
            return;
        }
        axios.post(`${simpleUrl}/destination`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            }
        })
        .then(response => {
           mySwal.fire({
                title: 'Success',
                text: 'Destination added successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
            addDestination(response.data);
            setFormData({
                name: '',
                description: '',
                country: '',
                city: '',
            });
            navg('/');
        })
        .catch(error => console.error(error));
    };

    return (
        <form className={Styles.addDestinationForm} onSubmit={handleSubmit}>
            <h2>Add New Destination</h2>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </label>
            <label>
                Country:
                <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </label>
            <label>
                City:
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </label>
            <button type="submit">Add Destination</button>
        </form>
    );
}

export default AddDestination;
