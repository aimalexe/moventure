import React from 'react';
import styles from '../../../styles/Body.module.css'
function SearchBox() {
    return (
        <div className={styles.searchContainer}>
            <h1 className={styles.searchTitle}>YOUR JOURNEY STARTS NOW</h1>

            <input type="text" placeholder="Search..." inputMode='search' className={styles.searchInput} />
            <button className={styles.searchButton}>Search</button>
        </div>
    );
}

export default SearchBox;