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
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Receipt;
