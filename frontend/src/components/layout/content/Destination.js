import React from 'react';
import Styles from '../../../styles/Destination.module.css';
import { Link} from 'react-router-dom';



function Destination({ name, description, country, city, id }) {
      const handleMoreInfo = () => {
     
    }

    return (
        <div className={Styles.destination}>
            <img src="https://via.placeholder.com/150" alt="destination" />
            <h2>{name}</h2>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>City:</strong> {city}</p>
            <p>{description}</p>
            <Link to={`/singledestination/${id}`}><button className={Styles.button} onClick={handleMoreInfo}> View More</button></Link>
        </div>
    );
}

export default Destination;
