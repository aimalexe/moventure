import React, { useEffect, useState } from 'react';
import Destination from './Destination'; // Make sure the path is correct
import { simpleUrl } from '../small_components/Url';
import axios from 'axios';
import Styles from '../../../styles/Destinations.module.css';
import AddDestination from './../content/AddDistination';

function Destinations() {
    const [destinations, setDestinations] = useState([]);
   

    useEffect(() => {
    const fetchData = ()=>{
        axios.get(`${simpleUrl}/destination`)
        .then((response) => {
            // console.log(response.data.data);
            setDestinations(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
//     const apiSecretKey = "hB1wolvBptuOzof3BE72CEURVceL0yCwutwdaK3409Q";
//     function getPicture() {
//     axios.get(`https://api.unsplash.com/photos/?client_id=${apiSecretKey}`)
//     .then((response) => {
//         setPictures(response.data);
//         // console.log(response.data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// }

//     getPicture();
    fetchData();
    }, []);
    const addDestination = (newDestination) => {
        setDestinations([...destinations, newDestination]);
    };

    return (
        <div className={Styles.container}  >
            
        <h1 className={Styles.h2} id='distinations'>Popular Destinations</h1>
        <div className={Styles.grid}>
            {destinations.map((destination) => (
                <Destination
                    key={destination.id}
                    name={destination.name}
                    description={destination.description}
                    country={destination.country}
                    city={destination.city}
                    id={destination.id}
                />
            ))}
            <AddDestination addDestination={addDestination} />
        </div>
    </div>
    );
}

export default Destinations;
