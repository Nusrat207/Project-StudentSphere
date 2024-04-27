import React from 'react';
import Top from '../components/Top';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import id1 from './person-vcard-fill.svg'
import name1 from './person-badge.svg'
import mail1 from './envelope-fill.svg'
import phone1 from './telephone-fill.svg'
import dept1 from './book.svg'

export default function MyProfile() {
  let name = localStorage.getItem("name");
  let mail = localStorage.getItem("mail");
  let phone = localStorage.getItem("phone");
  let std = localStorage.getItem("student_id");
  let dept= localStorage.getItem("dept");

  const containerStyle = {
    backgroundColor: '#ffffff', 
    padding: '20px',
    border: '1px solid #000000', 
    borderRadius: '10px', 
  };


  const inputStyle = {
    fontSize: '18px', 
    color: '#000000', 
    border: '2px solid #000000', 
    backgroundColor: '#ffffff',
    borderRadius: '15px'

  };

  return (
    <div>  
        <Top/>
        <Navbar/>
          <div className="container mt-5" >
      <div className="row" >
        <div className="col-md-6 mx-auto" >
          <div className="card" style={containerStyle}>
            <div className="card-header">
              <h4 className="card-title" style={{color:'black', fontSize:'2rem', fontWeight:'bold'}}>Personal Information</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label" style={{color:'black', fontSize:'1.4rem', fontWeight:'bold'}}>
                <img src={name1} alt="n" style={{ width: '20px', marginRight: '9px' }} />
                  Name:</label>
                <input type="text" className="form-control" style={inputStyle} value={name} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color:'black', fontSize:'1.4rem', fontWeight:'bold'}}>
                <img src={id1} alt="n" style={{ width: '20px', marginRight: '9px' }} />
                  Student ID:</label>
                <input type="text" className="form-control" style={inputStyle}  value={std} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color:'black', fontSize:'1.4rem', fontWeight:'bold'}}>
                <img src={mail1} alt="n" style={{ width: '20px', marginRight: '9px' }} />
                  Email:</label>
                <input type="email" className="form-control" style={inputStyle}  value={mail} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color:'black', fontSize:'1.4rem', fontWeight:'bold'}}>
                <img src={phone1} alt="n" style={{ width: '20px', marginRight: '9px' }} />
                  Phone No.:</label>
                <input type="tel" className="form-control" style={inputStyle}  value={phone} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color:'black', fontSize:'1.4rem', fontWeight:'bold'}}>
                <img src={dept1} alt="n" style={{ width: '20px', marginRight: '9px' }} />
                  Department:</label>
                <input type="text" className="form-control" style={inputStyle}  value={dept} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <Footer/>
    </div>

  );
}
