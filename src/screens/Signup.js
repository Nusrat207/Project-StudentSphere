import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import Top from '../components/Top';
import Footer from '../components/Footer';
import './styles.css'
export default function Signup() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", student_id: "", dept:"", mail: "", phone: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/CreateUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, student_id: credentials.student_id, dept:credentials.dept, mail: credentials.mail, phone: credentials.phone, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials")
        } else{
            navigate("/login");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <div><Top /> </div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light custom-navbar" style={{ backgroundColor: '#60a4ab' }}>
                    <div className="container-fluid">
                        <Link className="navbar-brand fs-3" to="/"></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link fs-3" aria-current="page" to="/">Home</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <section className="vh-80" >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11" >
                            <div className="card text-black" style={{ borderRadius: '0px', backgroundImage: 'linear-gradient(45deg, rgba(13, 0, 61,0.2) 0%, rgba(13, 0, 61,0.2) 16.667%,rgba(14, 79, 102,0.2) 16.667%, rgba(14, 79, 102,0.2) 33.334%,rgba(15, 158, 143,0.2) 33.334%, rgba(15, 158, 143,0.2) 50.001%,rgba(16, 198, 163,0.2) 50.001%, rgba(16, 198, 163,0.2) 66.668%,rgba(15, 119, 122,0.2) 66.668%, rgba(15, 119, 122,0.2) 83.335%,rgba(14, 40, 81,0.2) 83.335%, rgba(14, 40, 81,0.2) 100.002%),linear-gradient(22.5deg, rgba(13, 0, 61,0.2) 0%, rgba(13, 0, 61,0.2) 16.667%,rgba(14, 79, 102,0.2) 16.667%, rgba(14, 79, 102,0.2) 33.334%,rgba(15, 158, 143,0.2) 33.334%, rgba(15, 158, 143,0.2) 50.001%,rgba(16, 198, 163,0.2) 50.001%, rgba(16, 198, 163,0.2) 66.668%,rgba(15, 119, 122,0.2) 66.668%, rgba(15, 119, 122,0.2) 83.335%,rgba(14, 40, 81,0.2) 83.335%, rgba(14, 40, 81,0.2) 100.002%),linear-gradient(0deg, rgba(13, 0, 61,0.2) 0%, rgba(13, 0, 61,0.2) 16.667%,rgba(14, 79, 102,0.2) 16.667%, rgba(14, 79, 102,0.2) 33.334%,rgba(15, 158, 143,0.2) 33.334%, rgba(15, 158, 143,0.2) 50.001%,rgba(16, 198, 163,0.2) 50.001%, rgba(16, 198, 163,0.2) 66.668%,rgba(15, 119, 122,0.2) 66.668%, rgba(15, 119, 122,0.2) 83.335%,rgba(14, 40, 81,0.2) 83.335%, rgba(14, 40, 81,0.2) 100.002%),linear-gradient(90deg, rgb(73, 73, 73),rgb(94, 94, 94))'}}>
                                <div className="card-body p-md-1">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 ">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color:'white'}}>Create New Account</p>
                                            <Form className="mx-1 mx-md-4" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }} onSubmit={handleSubmit} >
                                                <Form.Group className="mb-4" controlId="formBasicName">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" placeholder="your name" name='name' value={credentials.name} onChange={onChange} className="placeholder-black" style={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', border: '1px solid black'  }}/> 
                                                </Form.Group>
                                                <Form.Group className="mb-4" controlId="formBasicStudentId">
                                                    <Form.Label>Student ID</Form.Label>
                                                    <Form.Control type="text" placeholder="your student ID" name='student_id' value={credentials.student_id} onChange={onChange} className="placeholder-black" style={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', border: '1px solid black'  }}/>
                                                </Form.Group>
                                                <Form.Group className="mb-4" controlId="formBasicDept">
                                                    <Form.Label>Department</Form.Label>
                                                    <Form.Control type="text" placeholder="your dept" name='dept' value={credentials.dept} onChange={onChange} className="placeholder-black" style={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', border: '1px solid black'  }} />
                                                </Form.Group>
                                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="your email" name='mail' value={credentials.mail} onChange={onChange} className="placeholder-black" style={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', border: '1px solid black'  }} />
                                                </Form.Group>
                                                <Form.Group className="mb-4" controlId="formBasicPhone">
                                                    <Form.Label>Phone</Form.Label>
                                                    <Form.Control type="text" placeholder="your phone number" name='phone' value={credentials.phone} onChange={onChange} className="placeholder-black" style={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', border: '1px solid black'  }} />
                                                </Form.Group>
                                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="password (at least 6 digits)" name='password' value={credentials.password} onChange={onChange} className="placeholder-black" style={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', border: '1px solid black'  }}/>
                                                </Form.Group>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <Button style={{backgroundColor:'white', color:'black', fontSize:'15px', fontWeight:'bold'}} type="submit" className="btn-lg hover-btn">Sign Up</Button>
                                                </div>
                                            </Form>
                                            <p className="text-center mb-1" style={{color:'white'}}>Already have an account? <Link to="/login" className='btn btn-danger' style={{backgroundColor:'transparent', borderColor:'white', borderWidth:'2.5px'}}>Login</Link> </p>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-using-laptop-5612503-4678408.png?f=webp" className="img-fluid" alt="Sample image" style={{ width: '80%', height: 'auto' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div> <Footer /> </div>
        </div>
    );
}
