import React, { useState } from 'react';
import Top from '../components/Top'
import Navbar from '../components/Navbar'
import {Link, useNavigate} from 'react-router-dom'
export default function () {
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

    const [credentials, setCredentials] = useState({
        currentPw:'',
        dept: '',
        mail: '',
        phone: '',
        newPw: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();
    const handleCancel = () =>{
        navigate("/myprofile");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { currentPw, dept, mail, phone, newPw} = credentials;
        const studentIdToUpdate = localStorage.getItem("student_id");
    
        const response = await fetch(`http://localhost:5000/api/updateUser/${studentIdToUpdate}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({currentPw, dept, mail, phone, newPw})
        });
        const json = await response.json();
        console.log(json);
    
        if (!json.success) {
            alert("Failed to update user data. Please check the provided credentials.");
        } else {
            alert("User data updated successfully.");
            localStorage.setItem("mail", json.updatedData.mail)
            localStorage.setItem("dept", json.updatedData.dept)
            localStorage.setItem("phone", json.updatedData.phone)
            navigate("/myprofile");
        }
    }
    

    return (
        <div>
            <Top />
            <Navbar />
            <div className="container mt-5" >
                <div className="row" >
                    <div className="col-md-6 mx-auto">
                        <div className="card" style={containerStyle}>
                            <div className="card-header">
                                <h4 className="card-title" style={{ color: 'black', fontSize: '2rem', fontWeight: 'bold' }}>Edit Profile</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} >
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: 'black', fontSize: '1.4rem', fontWeight: 'bold' }} >Current Password:</label>
                                        <input type="password" className="form-control" name="currentPw" style={inputStyle} value={credentials.currentPw} onChange={(e) => setCredentials({ ...credentials, currentPw: e.target.value })}  required  />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: 'black', fontSize: '1.4rem', fontWeight: 'bold' }}>New Email:</label>
                                        <input type="email" className="form-control"  name="mail"  style={inputStyle}  value={credentials.mail} onChange={(e) => setCredentials({ ...credentials, mail: e.target.value })}  />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: 'black', fontSize: '1.4rem', fontWeight: 'bold' }}>New Phone No.:</label>
                                        <input type="tel" className="form-control"  name="phone"  style={inputStyle} value={credentials.phone} onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}  />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: 'black', fontSize: '1.4rem', fontWeight: 'bold' }}>New Department:</label>
                                        <input type="text" className="form-control"  name="dept"  style={inputStyle} value={credentials.dept} onChange={(e) => setCredentials({ ...credentials, dept: e.target.value })}  />
                                    </div>
                                    <div className="mb-3" style={{ paddingBottom: '15px' }}>
                                        <label className="form-label" style={{ color: 'black', fontSize: '1.4rem', fontWeight: 'bold' }}>New Password:</label>
                                        <input type="password" className="form-control"   name="newPw"  style={inputStyle} value={credentials.newPw} onChange={(e) => setCredentials({ ...credentials, newPw: e.target.value })}  />
                                    </div>
                                    <button type="button" className="btn" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginRight: '30px', borderColor: '#24a0ed', borderWidth: '2px', color: 'black' }} onClick={handleCancel} >Cancel</button>
                                    <button type="submit" className="btn btn-primary" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Save Changes</button>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
