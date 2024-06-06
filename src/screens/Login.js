import React , { useState }  from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Top from '../components/Top';
import Footer from '../components/Footer';
import './buton.css';
import './bbton.css';
/* const globalVariables = {
                
              }; */
export default function Login() {
    const [credentials, setCredentials] = useState({student_id:"",password:""});

    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginUser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({student_id:credentials.student_id,password:credentials.password})
        });
        const json=await response.json();
        console.log(json);

        if(!json.success){
            alert("Enter valid credentials")
        } else{
            localStorage.setItem("authtoken", json.authtoken);
            localStorage.setItem("name", json.userData.name);
            localStorage.setItem("mail", json.userData.mail);
            localStorage.setItem("phone", json.userData.phone);
            localStorage.setItem("dept", json.userData.dept);

            localStorage.setItem("student_id", credentials.student_id);
            console.log(localStorage.getItem("authtoken"));

            console.log(localStorage.getItem("name"));
         

            navigate("/");
        }
    }

    const onChange = (event) =>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <div>
      <div><Top/></div>
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
      <section className="vh-100" style={{ backgroundColor: 'transparent' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11" >
              <div className="card text-black" style={{ borderRadius: '5px', backgroundColor:'#468187',backgroundImage: 'linear-gradient(45deg, rgba(13, 0, 61,0.2) 0%, rgba(13, 0, 61,0.2) 16.667%,rgba(14, 79, 102,0.2) 16.667%, rgba(14, 79, 102,0.2) 33.334%,rgba(15, 158, 143,0.2) 33.334%, rgba(15, 158, 143,0.2) 50.001%,rgba(16, 198, 163,0.2) 50.001%, rgba(16, 198, 163,0.2) 66.668%,rgba(15, 119, 122,0.2) 66.668%, rgba(15, 119, 122,0.2) 83.335%,rgba(14, 40, 81,0.2) 83.335%, rgba(14, 40, 81,0.2) 100.002%),linear-gradient(22.5deg, rgba(13, 0, 61,0.2) 0%, rgba(13, 0, 61,0.2) 16.667%,rgba(14, 79, 102,0.2) 16.667%, rgba(14, 79, 102,0.2) 33.334%,rgba(15, 158, 143,0.2) 33.334%, rgba(15, 158, 143,0.2) 50.001%,rgba(16, 198, 163,0.2) 50.001%, rgba(16, 198, 163,0.2) 66.668%,rgba(15, 119, 122,0.2) 66.668%, rgba(15, 119, 122,0.2) 83.335%,rgba(14, 40, 81,0.2) 83.335%, rgba(14, 40, 81,0.2) 100.002%),linear-gradient(0deg, rgba(13, 0, 61,0.2) 0%, rgba(13, 0, 61,0.2) 16.667%,rgba(14, 79, 102,0.2) 16.667%, rgba(14, 79, 102,0.2) 33.334%,rgba(15, 158, 143,0.2) 33.334%, rgba(15, 158, 143,0.2) 50.001%,rgba(16, 198, 163,0.2) 50.001%, rgba(16, 198, 163,0.2) 66.668%,rgba(15, 119, 122,0.2) 66.668%, rgba(15, 119, 122,0.2) 83.335%,rgba(14, 40, 81,0.2) 83.335%, rgba(14, 40, 81,0.2) 100.002%),linear-gradient(90deg, rgb(73, 73, 73),rgb(94, 94, 94))' }}>
                <div className="card-body p-md-1">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 ">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color:'white'}}>Welcome Back!</p>
                      <Form className="mx-1 mx-md-4" style={{ fontSize:'1.25rem', fontWeight:'bold', color:'white' }} onSubmit={handleSubmit}  >
                        <Form.Group className="mb-4" controlId="formBasicStudentId">
                          <Form.Label>Student ID</Form.Label>
                          <Form.Control type="text" placeholder="Enter your student ID" name='student_id' value={credentials.student_id} onChange={onChange} className="placeholder-black" style={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', border: '1px solid black'  }} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter your password"  name='password' value={credentials.password} onChange={onChange} className="placeholder-black" style={{ backgroundColor: 'white', color: 'black', borderRadius: '12px', border: '1px solid black'  }}  />
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <div variant="link" style={{ color: 'black', fontSize:'15px', fontWeight:'normal' }}>Forgot password?</div>
                          </div>
                          
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Button style={{backgroundColor:'white', color:'black', fontWeight:'bold', fontSize:"18px"}} type="submit" className="btn-lg hover-btn">Login</Button>
                        </div>
                        <div style={{paddingTop:'20px'}}>
                            <p className="mb-3" style={{paddingRight:'120px'}}>Don't have an account?  <Link to="/signup" id='Link' className='btn ' style={{backgroundColor:'transparent', borderColor:'white', borderWidth:'2.5px'}}>Sign Up</Link> </p>
                          </div>
                      </Form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-using-laptop-5612503-4678408.png?f=webp" className="img-fluid" alt="Sample image" style={{ width: '100%', height: 'auto' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div> <Footer/> </div>
    </div>
  );
}
