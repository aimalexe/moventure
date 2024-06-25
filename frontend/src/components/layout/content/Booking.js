import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { simpleUrl } from '../small_components/Url';
import { mySwal } from '../small_components/Alert';
import Style from '../../../styles/Booking.module.css';

const Bookings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        bookingDate: '',
        totalCost: '',
        status: 'pending',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { bookingDate, totalCost, status } = form;
        axios.post(`${simpleUrl}/booking`, {
            bookingDate,
            totalCost,
            status,
            destinationId: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            }
        }).then((response) => {
            mySwal.fire({
                title: 'Success',
                text: 'Booking created successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/');
            console.log(response);
        }
        ).catch((error) => {
            mySwal.fire({
                title: 'Error',
                text: 'An error occurred, please try again',
                icon: 'error',
                showConfirmButton: true,
                timer: 2000
            });
            console.log(error);
        });

    };

    return (
        <div className={Style.container}>
            <div className={Style.sideMenu}>
                <ul>
                    <li><a href="#home">All Bookings</a></li>
                    <li><a href="#bookings">Delete Booking</a></li>
                    <li><a href="#profile">Accumodation</a></li>
                    <li><a href="#settings">Flights</a></li>
                </ul>
            </div>
            <div className={Style.content}>
                <h2 className={Style.h2}>Create a new Booking</h2>
                <form className={Style.bookingForm} onSubmit={handleSubmit}>
                    <input
                        type="date"
                        name="bookingDate"
                        value={form.bookingDate}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="totalCost"
                        placeholder="Total Cost"
                        value={form.totalCost}
                        onChange={handleChange}
                        required
                    />
                    <select name="status" value={form.status} onChange={handleChange} required>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                    <button type="submit">Create Booking</button>
                </form>
            </div>
        </div>
    );
};

export default Bookings;
