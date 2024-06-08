// Receipt.js
import React from 'react';

const Receipt = ({ bookingInfo, onClose }) => {
  return (
    <div className="receipt-overlay">
      <div className="receipt">
        <h3>Booking Receipt</h3>
        <p>Date: {bookingInfo.date}</p>
        <p>Time Slot: {bookingInfo.time}</p>
        <p>Customer Name: {bookingInfo.user}</p>
        <button style={{backgroundColor:'#ffc9c9', borderWidth:'3.5px', borderColor:'red', color:'black', fontWeight:'bold'}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Receipt;
