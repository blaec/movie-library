import React from 'react';
import './Logo.css';
import movieLogo from '../../assets/images/round-movie.png';


const logo = () => {
    return (
        <div className="Logo">
            <img src={movieLogo} alt="MovieLibrary"/>
        </div>
    );
};

export default logo;
