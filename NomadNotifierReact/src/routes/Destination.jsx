import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export default function Destination() {
    const [attractions, setAttractions] = useState([]);
    const [selectedAttraction, setSelectedAttraction] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { people } = location.state || { people: 1 };

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const q = query(collection(db, "attractions"));
                const querySnapshot = await getDocs(q);
                const attractionsArray = [];
                querySnapshot.forEach((doc) => {
                    const attractionData = doc.data();
                    // Extract city and country from attractionData
                    const { city, country, name } = attractionData;
                    // Push an object containing id, city, country, and name to attractionsArray
                    attractionsArray.push({
                        id: doc.id,
                        city,
                        country,
                        name
                    });
                });
                setAttractions(attractionsArray);
            } catch (error) {
                console.error('Error fetching attractions:', error);
            }
        };

        fetchAttractions();
    }, []);

    const handleNext = () => {
        navigate('/hotel', { state: { people, selectedAttraction } });
    };

    const handleAttractionChange = (e) => {
        setSelectedAttraction(e.target.value);
    };

    return (
        <div className="web-container">
            <h2>Where would you like to visit?</h2>
            <label htmlFor="places">Select a destination:</label>
            <select
                id="places"
                value={selectedAttraction}
                onChange={handleAttractionChange}
            >
                <option value="">Choose an option:</option>
                {attractions.map((attraction) => (
                    <option key={attraction.id} value={attraction.country}>
                        {attraction.city}, {attraction.country}
                    </option>
                ))}
            </select>
            <br />
            <button className="next-button" onClick={handleNext} disabled={!selectedAttraction}>Next</button>
        </div>
    );
}