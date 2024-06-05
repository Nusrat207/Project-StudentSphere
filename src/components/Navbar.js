import './style.css';

import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import personGear from '../components/person-gear.svg'
import cartIcon from '../components/cart-check.svg'
import Modal from '../Modal';
import Modal2 from '../Modal2';
import Cart from '../screens/Cart';
import Bag from '../components/bag.svg'
import { Badge } from 'react-bootstrap';
import { useCart } from './ContextReducer';
import { useCart2 } from './contextred2';

import MerchCart from '../screens/MerchCart';

import Person from './person-fill.svg'
import Edit from './edit.svg'
import Logout from './logout.svg'
import Orders from './order.svg'


export default function Navbar() {
  const [cartView, setcartView] = useState(false);
  const [cartView2, setcartView2] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let foodata = useCart();

  let merdata = useCart2();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("student_id");
    localStorage.removeItem("name");
    localStorage.removeItem("mail");
    localStorage.removeItem("phone");
    localStorage.removeItem("dept");
    navigate("/login");
  }

  const loadCart = () => {
    setcartView(true)
  }

  const loadCart2 = () => {
    setcartView2(true)
  }
  return (
    !localStorage.getItem("authtoken") ? (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand fs-3" to="/"></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active fs-3" aria-current="page" style={{ fontWeight: 'bold', color: 'white' }} to="/">Home</Link>
                </li>

              </ul>
              <div className="navbar-nav d-flex align-items-center">
                <Link className="btn bg-white mx-1" style={{ fontSize: '1.3rem', color: '#1a5c56', fontWeight: 'bold' }} to="/signup">Signup</Link>
                <Link className="btn bg-white mx-1" style={{ fontSize: '1.3rem', color: '#1a5c56', fontWeight: 'bold' }} to="/login">Login</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    ) : (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand fs-3" to="/"></Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item" style={{ marginRight: '20px' }}>
                  <Link className="nav-link active fs-3" aria-current="page" style={{ fontWeight: 'bold', color: 'white' }} to="/">Home</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle fs-3" to="/food" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: 'bold', color: 'white' }}>
                    Meals
                  </Link>

                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', color: 'black' }}>
                    <li><Link className="dropdown-item fs-5" to="/eastShop" style={{ color: 'black', fontWeight: 'bold' }} >East Shop</Link></li>

                    <li><Link className="dropdown-item fs-5" to="/westShop" style={{ color: 'black', fontWeight: 'bold' }}  >West Shop</Link></li>
                  </ul>
                </li>
                <li className="nav-item" style={{ marginRight: '20px' }}>
                  <Link className="nav-link fs-3" aria-current="page" style={{ fontWeight: 'bold', color: 'white' }} to="/merch">Merch</Link>
                </li>
                <li className="nav-item" style={{ marginRight: '20px' }}>
                  <Link className="nav-link fs-3" aria-current="page" style={{ fontWeight: 'bold', color: 'white' }} to="/study">Scheduler</Link>
                </li>
                <li className="nav-item" style={{ marginRight: '20px' }}>
                  <Link className="nav-link fs-3" aria-current="page" style={{ fontWeight: 'bold', color: 'white' }} to="/laundry">Laundry</Link>
                </li>
              </ul>

            </div>

            <div className="navbar-nav d-flex align-items-center" >
              <div className="btn bg-white mx-1" style={{ fontSize: '1.3rem', color: '#1a5c56', fontWeight: 'bold', marginRight: '9px' }} onClick={loadCart2}>
                <img src={Bag} alt="bag" style={{ width: '25px', marginRight: '9px' }} />
                {merdata.length !== 0 ? <Badge pill bg="danger">{merdata.length}</Badge> : null}
              </div> {cartView2 ? <Modal2 onClose={() => setcartView2(false)}><MerchCart></MerchCart></Modal2> : ""}

              <div className="btn bg-white mx-1" style={{ fontSize: '1.3rem', color: '#1a5c56', fontWeight: 'bold', marginRight: '9px' }} onClick={loadCart} >
                <img src={cartIcon} alt="Cart Icon" style={{ width: '25px', marginRight: '9px' }} />
                {/* Food Cart */} { }  {foodata.length !== 0 ? <Badge pill bg="danger">{foodata.length}</Badge> : null}
              </div>
              {cartView ? <Modal onClose={() => setcartView(false)}><Cart></Cart></Modal> : ""}
              {/* <div>
                <div className="btn bg-white mx-1" style={{ fontSize: '1.3rem', color: '#1a5c56', fontWeight: 'bold' }} to="/mp">My Profile</div> 
              
                  <div className="btn bg-white mx-1" style={{ fontSize: '1.3rem', color: '#1a5c56', fontWeight: 'bold' }} to="/cart">Cart</div>
                  <div className="btn bg-white text-danger mx-1" style={{ fontSize: '1.3rem', fontWeight: 'bold' }} onClick={handleLogout}>Logout</div>
                </div>
    </div> */}

<div className="navbar-nav">
                <div className="dropdown">
                  <button className="btn bg-white mx-1 dropdown-toggle" style={{ color: '#1a5c56', fontWeight: 'bold' }} type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={personGear} alt="Profile Icon" style={{ width: '30px', height: '30px' }} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>
                    <li><Link className="dropdown-item" to="/myprofile" style={{ color: 'black', fontWeight: 'bold' }}>
                      
                    <img src={Person} alt="Profile Icon" style={{ width: '15px', height: '15px', marginRight:'8px', marginLeft:'4px' }} />
                      My Profile</Link></li>
                    <li>
                     <div className="dropdown2">
                    <button className="dropdown-item btn bg-white mx-1 " style={{ color: 'black', fontWeight: 'bold' }}  data-bs-toggle="dropdown2" aria-expanded="false">
                    <img src={Orders} alt="Profile Icon" style={{ width: '15px', height: '15px', marginRight:'8px' }} />
                      My Orders</button>
                    <ul className="dropdown2-menu dropdown2-menu-end" aria-labelledby="profileDropdown" style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', listStyleType: 'none'  }}>
                    <li><Link className="dropdown2-item" to="/mealHistory" style={{ textDecoration:'none',color: 'black', fontWeight: 'bold', marginLeft:'12px' }}>Meals</Link></li>
                    <li><Link className="dropdown2-item" to="/merchHistory" style={{ textDecoration:'none', color: 'black', fontWeight: 'bold', marginLeft:'12px' }}>Merch</Link></li>
                    </ul>
                    </div>
                    </li>
                    
                    <li><Link className="dropdown-item" to="/edit-profile" style={{ color: 'black', fontWeight: 'bold' }}>
                    <img src={Edit} alt="Profile Icon" style={{ width: '15px', height: '15px', marginRight:'8px', marginLeft:'5px' }} />
                      Edit Profile</Link></li>
                    <li><button className="dropdown-item" onClick={handleLogout} style={{ color: 'black', fontWeight: 'bold' }}>
                    <img src={Logout} alt="Profile Icon" style={{ width: '15px', height: '15px', marginRight:'8px', marginLeft:'6px' }} />
                      Logout</button></li>
                  </ul>
                </div>
              </div>



            </div>
          </div>
        </nav>
      </div>
    )
  );

}



/*

<div className="navbar-nav">
                <div className="dropdown">
                  <button className="btn bg-white mx-1 dropdown-toggle" style={{ color: '#1a5c56', fontWeight: 'bold' }} type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={personGear} alt="Profile Icon" style={{ width: '30px', height: '30px' }} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>
                    <li><Link className="dropdown-item" to="/myprofile" style={{ color: 'black', fontWeight: 'bold' }}>My Profile</Link></li>
                    <li><Link className="dropdown-item" to="/my-orders" style={{ color: 'black', fontWeight: 'bold' }}>My Orders</Link></li>
                    <li><Link className="dropdown-item" to="/edit-profile" style={{ color: 'black', fontWeight: 'bold' }}>Edit Profile</Link></li>
                    <li><button className="dropdown-item" onClick={handleLogout} style={{ color: 'black', fontWeight: 'bold' }}>Logout</button></li>
                  </ul>
                </div>
              </div>

              <div className="navbar-nav">
                <div className="dropdown">
                  <button className="btn bg-white mx-1 dropdown-toggle" style={{ color: '#1a5c56', fontWeight: 'bold' }} type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={personGear} alt="Profile Icon" style={{ width: '30px', height: '30px' }} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>
                    <li><Link className="dropdown-item" to="/myprofile" style={{ color: 'black', fontWeight: 'bold' }}>My Profile</Link></li>
                    <li>
                     <div className="dropdown2">
                    <Button className="dropdown-item btn bg-white mx-1 dropdown-toggle" style={{ color: 'black', fontWeight: 'bold' }}  data-bs-toggle="dropdown" aria-expanded="false">My Orders</Button>
                    <ul className="dropdown2-menu dropdown2-menu-end" aria-labelledby="profileDropdown" style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>
                    <li><Link className="dropdown2-item" to="/mealHis" style={{ color: 'black', fontWeight: 'bold' }}>Edit Profile</Link></li>
                    <li><Link className="dropdown2-item" to="/merchHis" style={{ color: 'black', fontWeight: 'bold' }}>Edit Profile</Link></li>
                    </ul>
                    </div>
                    </li>
                    
                    <li><Link className="dropdown-item" to="/edit-profile" style={{ color: 'black', fontWeight: 'bold' }}>Edit Profile</Link></li>
                    <li><button className="dropdown-item" onClick={handleLogout} style={{ color: 'black', fontWeight: 'bold' }}>Logout</button></li>
                  </ul>
                </div>
              </div>

*/