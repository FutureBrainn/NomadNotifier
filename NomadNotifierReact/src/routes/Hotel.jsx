import React, { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';


export default function Hotel() {
    const [hotel, setHotel] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { people, selectedAttraction } = location.state || { people: 1, destination: '' };

    const hotels = [
        { id: 1, name: 'Hilltop Hotel' },
        { id: 2, name: 'Azure Skies Inn' },
        { id: 3, name: 'The Lux' },
        { id: 4, name: 'Shady Grove Motel' },
        { id: 5, name: 'Skyline Towers' },
        { id: 6, name: 'Luxury Suites' }
    ];


    const handleNext = () => {
        navigate('/roomnumber', { state: { people, selectedAttraction, hotel } });
    };


    return (
        <div className="web-container">
            <h2>Where would you like to stay?</h2>
            <label htmlFor="stays">Select a stay:</label>
            <select
                id="stays"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
            >
                <option value="">Choose an option:</option>
                {hotels.map((hot) => (
                    <option key={hot.id} value={hot.name}>
                        {hot.name}
                    </option>
                ))}
            </select>
            <br />
            <button className="next-button" onClick={handleNext} disabled={!hotel}>Next</button>
        </div>
    );
}