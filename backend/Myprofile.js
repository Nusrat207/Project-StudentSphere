import React from 'react';

import Navbar from '../src/components/Navbar';
import Top from '../src/components/Top';

export default function MyProfile() {
  return (
    <div>  
       <Top/>
        <Navbar/>
          <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">My Profile</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" value="John Doe" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Student ID:</label>
                <input type="text" className="form-control" value="123456789" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" value="john@example.com" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone No.:</label>
                <input type="tel" className="form-control" value="123-456-7890" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Department:</label>
                <input type="text" className="form-control" value="Computer Science" readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> </div>

  );
}
