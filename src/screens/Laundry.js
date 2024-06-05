import React, { useState, useEffect } from 'react';
import Top from "../components/Top";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import axios from 'axios';
import Receipt from './Receipt'; 
import Wash from './wash.png';
const Laundry = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [user, setUser] = useState('');
  const [showReceipt, setShowReceipt] = useState(false); 
  const [bookingInfo, setBookingInfo] = useState({}); 

  useEffect(() => {
    if (selectedDate) {
      fetchSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchSlots = async (date) => {
    try {
      const response = await axios.get('http://localhost:5000/api/slots', { params: { date } });
      console.log('Slots fetched:', response.data);
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots', error);
    }
  };

  const handleBookSlot = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/slots/book-slot', {
        date: selectedDate,
        time: selectedSlot,
        user: user,
      });
      if (response && response.data) {
        console.log(response.data);
        alert(response.data.message);
        fetchSlots(selectedDate);

        setBookingInfo({ date: selectedDate, time: selectedSlot, user: user });
        setShowReceipt(true);
      } else {
        console.error('Invalid response:', response);
        alert('Invalid response received from the server');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error('Error occurred:', error);
        alert('An error occurred while booking the slot');
      }
    }
  };

  const fixedSlots = [
    "12:00 AM - 02:00 AM",
    "02:00 AM - 04:00 AM",
    "04:00 AM - 06:00 AM",
    "06:00 AM - 08:00 AM",
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
    "08:00 PM - 10:00 PM",
    "10:00 PM - 12:00 AM"
  ];
  return (
    <div>
        <Top></Top>
        <Navbar></Navbar>
   
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '20vh', paddingTop: '20px' }}>
        <h2>Book Slots easily~</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh', paddingTop: '0px' }}>
        <img src={Wash} alt="wash" style={{ width: '455px', margin: '0',paddingBottom:'40px' }} />
      </div>
      <div style={{ padding: '20px 0', textAlign: 'center' }}>
        <div className="input-container" style={{ marginBottom: '10px' }}>
          <label style={{fontWeight:'bold'}}>Date:&nbsp;</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
        <div className="input-container" style={{ marginBottom: '10px' }}>
          <label style={{fontWeight:'bold'}}>Time Slot:&nbsp;</label>
          <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
            <option value="">Select a time slot</option>
            {fixedSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <div className="input-container" style={{ marginBottom: '10px' }}>
          <label style={{fontWeight:'bold'}}>Customer Name:&nbsp;</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <button onClick={handleBookSlot} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s', fontWeight:'bold' }}>Book Slot</button>

      </div>
    </div> 
    <Footer></Footer>
     </div>
  );
}

export default Laundry;