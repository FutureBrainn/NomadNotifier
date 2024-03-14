import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PlanTravel() {
   const [number, setNumber] = useState(1);
   const navigate = useNavigate();
   const location = useLocation();

   const { people, selectedAttraction, hotel } = location.state || { people: 1, destination: '', hotel: '' };


   const handleNext = () => {
       navigate('/confirm-reservation', {state: { people, selectedAttraction, hotel, number }});
   };


   return (
       <div className="web-container">
           <h2>How many rooms do you need?</h2>
           <label htmlFor="rooms">Select the number of rooms:</label>
           <select id="rooms" value={number} onChange={e => setNumber(e.target.value)}>
               {Array.from({ length: 10 }, (_, i) => (
                   <option key={i + 1} value={i + 1}>{i + 1}</option>
               ))}
           </select>
           <br />
           <button className="next-button" onClick={handleNext}>Next</button>
       </div>
   );
}
