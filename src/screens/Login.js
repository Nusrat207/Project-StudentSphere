import React , { useState }  from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Top from '../components/Top';
import Footer from '../components/Footer';


/* const globalVariables = {
                
              }; */
export default function Login() {
    const [credentials, setCredentials] = useState({student_id:"",password:""});

    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/loginUser",{
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
            localStorage.setItem("student_id", credentials.student_id);
            console.log(localStorage.getItem("authtoken"));
          /*  let sid = credentials.student_id;
            try {
              let userData = await user.findOne({ sid });
              if (!userData) {
                  console.log("errorr");
              }

              let name = 'userData.name'
              let mail = 'userData.mail';
              let phone= 'userData.phone';
              let dept='userData.dept';

              localStorage.setItem("name", name);
              localStorage.setItem("mail", mail);
              localStorage.setItem("phone", phone);
              localStorage.setItem("dept", dept); 
              
            } catch(error){ console.log(error)} */

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
      <section className="vh-100" style={{ backgroundColor: '#defaf6' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11" >
              <div className="card text-black" style={{ borderRadius: '5px', backgroundColor:'#468187' }}>
                <div className="card-body p-md-1">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 ">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                      <Form className="mx-1 mx-md-4" style={{ fontSize:'1.25rem', fontWeight:'bold', color:'black' }} onSubmit={handleSubmit}  >
                        <Form.Group className="mb-4" controlId="formBasicStudentId">
                          <Form.Label>Student ID</Form.Label>
                          <Form.Control type="text" placeholder="Enter your student ID" name='student_id' value={credentials.student_id} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter your password"  name='password' value={credentials.password} onChange={onChange}  />
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <Button variant="link" style={{ color: 'black' }}>Forgot password?</Button>
                          </div>
                          
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Button variant="primary" type="submit" className="btn-lg">Login</Button>
                        </div>
                        <div>
                            <p className="mb-3">Don't have an account?  <Link to="/signup" className='btn btn-danger'>Sign Up</Link> </p>
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

