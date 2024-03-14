import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ConfirmReservation(){
    const location = useLocation(); 
    const { people, selectedAttraction, hotel, number } = location.state || {}; 

    const handleNext = () => {
        navigate('/attraction', { state: { people, selectedAttraction, hotel, number } });
    };

    return (
        <div className="web-container">
            <h2>Confirm Reservation</h2>
            <p>Number of people going: <strong>{people}</strong></p>
            <p>Where we're headed: <strong>{selectedAttraction}</strong></p>
            <p>Where we're staying: <strong>{hotel}</strong></p>
            <p>How many rooms we have: <strong>{number}</strong></p>
            <button className="next-button" onClick={handleNext}>Confirm</button> 
        </div>
    );
};


