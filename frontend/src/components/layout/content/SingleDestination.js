import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { simpleUrl } from '../small_components/Url';
import Styles from "../../../styles/SingleDestination.module.css";
import { mySwal } from '../small_components/Alert';

function SingleDestination() {
    const { id } = useParams();
    const [dest, setDest] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        const token = localStorage.getItem('x-auth-token');
        if (!token) {
            mySwal.fire({
                title: 'Error',
                text: 'You need to be logged in to create a booking',
                icon: 'error',
                showConfirmButton: true,
                timer: 2000
            });
            return;
        }
        else{
            navigate(`/booking/${id}`);
        }
    }

    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'});
        axios.get(`${simpleUrl}/destination/${id}`)
            .then((response) => {
                setDest(response.data.data);
            }).catch((error) => {
                console.log(error);
            });
    }, [id]);

     return (
        <div className={Styles.card}>
            <img src="https://via.placeholder.com/150" alt="destination" />
            <h1>{dest.name}</h1>
            <p><strong>Country:</strong> {dest.country}</p>
            <p><strong>City:</strong> {dest.city}</p>
            <p>{dest.description}</p>
            <button onClick={handleClick} className={Styles.button1} >Book this Place</button>
            <Link to="/" ><button className={Styles.button2} >Back to Destinations</button></Link>
        </div>
    );
}

export default SingleDestination;
