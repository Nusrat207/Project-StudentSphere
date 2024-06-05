import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Top from '../components/Top'
import './styles.css';
import { Link } from 'react-router-dom';

export default function () {
    return (
      localStorage.getItem("authtoken") ? ( 
        <div>
        <Top />
        <Navbar />
        <div
          className="hero-container"  >
          <div className="hero-content">
            <p className="display-4" style={{fontSize:'5rem', fontWeight:'bold'}}>Welcome to StudentSphere</p>
            <p className="lead" style={{fontSize:'2rem', fontWeight:'bold'}} >Your One-Stop Hub for Campus Life</p>
            <Link to="/eastShop" className="btn btn-lg" style={{backgroundColor:'white', color:'black', fontWeight:'bold'}}>Explore Now</Link>
          </div>
        </div> 
        <Footer />
      </div>
    ) : ( 
        <div>
        <Top />
        <Navbar />
        <div
          className="hero-container" >
          <div className="hero-content">
            <p className="display-4" style={{fontSize:'5rem', fontWeight:'bold'}}>Welcome to StudentSphere</p>
            <p className="lead" style={{fontSize:'2rem', fontWeight:'bold'}} >Your One-Stop Hub for Campus Life</p>
            <Link to="/signup" className="btn btn-lg" style={{backgroundColor:'white', color:'black', fontWeight:'bold'}}>Get Started</Link>
          </div>
        </div>
        <Footer />
      </div>
    )




    )
}
/* <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <h1 className="display-4 fw-normal">headline</h1>
        <p className="lead fw-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages.</p>
        
      </div>
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div> */