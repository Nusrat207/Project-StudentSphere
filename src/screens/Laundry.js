import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Top from "../components/Top";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import axios from 'axios';
import Receipt from './Receipt';
import Wash from './wash.png';
import Bell from './notif.png'
import './laundry.css'
const Laundry = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [user, setUser] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});


  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
        //alert(response.data.message);
        setModalMessage(response.data.message);
        setShowModal(true);
        fetchSlots(selectedDate);

        setBookingInfo({ date: selectedDate, time: selectedSlot, user: user });
        setShowReceipt(true);
      } else {
        console.error('Invalid response:', response);
        alert('Invalid response received from the server');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        //alert(error.response.data.message);
        setModalMessage(error.response.data.message);
        setShowModal(true);
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
          <h5 style={{fontStyle:'italic', opacity:'0.7'}}>Book Slots of your Hall's washing machines~</h5>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh', paddingTop: '0px' }}>
         {/* <img src={Wash} alt="wash" style={{ width: '455px', margin: '0', paddingBottom: '40px' }} /> */}
          {/*washing machine */}
          <div className="wrapper">
            <div className="washingmachine">
              <div className="drum"></div>
              <div className="door"></div>
              <div className="tray"></div>
              <div className="dial"></div>
              <div className="buttons"></div>
              <div className="pilot"></div>
            </div>
          </div>


        </div>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <div className="input-container" style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Date:&nbsp;</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
          <div className="input-container" style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Time Slot:&nbsp;</label>
            <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
              <option value="">Select a time slot</option>
              {fixedSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className="input-container" style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Customer Name:&nbsp;</label>
            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
          </div>
          
          <button className="wash-btn" onClick={handleBookSlot}>
      Book Slot
      
      <div className="star-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{
            shapeRendering: 'geometricPrecision',
            textRendering: 'geometricPrecision',
            imageRendering: 'optimizeQuality',
            fillRule: 'evenodd',
            clipRule: 'evenodd'
          }}
          viewBox="0 0 784.11 815.53"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{
            shapeRendering: 'geometricPrecision',
            textRendering: 'geometricPrecision',
            imageRendering: 'optimizeQuality',
            fillRule: 'evenodd',
            clipRule: 'evenodd'
          }}
          viewBox="0 0 784.11 815.53"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{
            shapeRendering: 'geometricPrecision',
            textRendering: 'geometricPrecision',
            imageRendering: 'optimizeQuality',
            fillRule: 'evenodd',
            clipRule: 'evenodd'
          }}
          viewBox="0 0 784.11 815.53"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{
            shapeRendering: 'geometricPrecision',
            textRendering: 'geometricPrecision',
            imageRendering: 'optimizeQuality',
            fillRule: 'evenodd',
            clipRule: 'evenodd'
          }}
          viewBox="0 0 784.11 815.53"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="star-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{
            shapeRendering: 'geometricPrecision',
            textRendering: 'geometricPrecision',
            imageRendering: 'optimizeQuality',
            fillRule: 'evenodd',
            clipRule: 'evenodd'
          }}
          viewBox="0 0 784.11 815.53"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
          </g>
        </svg>
      </div>
    </button>
        </div>
      </div>
      <Footer />
      {showReceipt && (
        <Receipt bookingInfo={bookingInfo} onClose={() => setShowReceipt(false)} />
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header >
          <Modal.Title style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <img src={Bell} style={{ width: '30px', marginRight: '9px' }} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '25px', fontWeight: 'bold' }}>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{  fontWeight: 'bold' }} onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default Laundry;