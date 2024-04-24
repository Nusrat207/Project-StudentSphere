import React from 'react'
import Navbar from '../components/Navbar'
import Top from '../components/Top'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';
import './styles.css';
import Arrow from '../screens/rightsym.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import Card_merch from '../components/Card_merch';

export default function () {

    const [search, setSearch] = useState('');

    const [merchItem, setmerchItem] = useState([]);


    const loadData = async () => {
        let response = await fetch("http://localhost:4000/api/MerchData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        console.log(response[0]);

        setmerchItem(response[0]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <Top />
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-2 " style={{ paddingRight: '0px', paddingLeft: '0px' }} >
                        <div className="flex-shrink-0 " style={{ width: '100%', height: '100%', paddingRight: '0px', backgroundColor: '#a2baba' }}>
                            <div className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                                <span className="fs-4 fw-semibold">Categories</span>
                            </div>
                            <ul className="list-unstyled ps-0">
                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true" style={{ color: 'black', fontSize: '1.3rem', fontWeight: 'bold' }}>
                                        <img src={Arrow} alt="arrow" style={{ width: '11px', height: '11px' }} />  Central
                                    </button>
                                    <div className="collapse show" id="home-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            {/* <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize:'1rem' }} >Summer</Link></li>
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize:'1rem' }}>Winter</Link></li> */}
                                            <li>
                                                <button className="btn btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#summer-collapse" aria-expanded="false" style={{ color: 'black', fontSize: '1.1rem', fontWeight: 'bold', paddingLeft: '25px' }}>
                                                    <img src={Arrow} alt="arrow" style={{ width: '9px', height: '9px' }} />  Summer
                                                </button>
                                                <div className="collapse" id="summer-collapse">
                                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                        <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '0.9rem', paddingLeft: '45px' }} >Tshirt</Link></li>
                                                        <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '0.9rem', paddingLeft: '45px' }}>Jersey</Link></li>

                                                    </ul> </div>

                                            </li>
                                            <button className="btn btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#winter-collapse" aria-expanded="false" style={{ color: 'black', fontSize: '1.1rem', fontWeight: 'bold', paddingLeft: '25px' }}>
                                                <img src={Arrow} alt="arrow" style={{ width: '9px', height: '9px' }} />  Winter
                                            </button>
                                            <div className="collapse" id="winter-collapse">
                                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                    <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '0.9rem', paddingLeft: '45px' }} >Hoodie</Link></li>
                                                    <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '0.9rem', paddingLeft: '45px' }}>Sweatshirt</Link></li>

                                                </ul> </div>
                                            <li>

                                            </li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false" style={{ color: 'black', fontSize: '1.3rem', fontWeight: 'bold' }}>
                                        <img src={Arrow} alt="arrow" style={{ width: '11px', height: '11px' }} />  Departmental
                                    </button>
                                    <div className="collapse" id="dashboard-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px' }} >CSE</Link></li>
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px' }}>EEE</Link></li>
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px' }}>MPE</Link></li>
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px' }}>CEE</Link></li>
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px' }}>BTM</Link></li>
                                        </ul>
                                    </div>
                                </li>

                                <hr style={{ height: '2px', color: 'black', border: '2px solid black' }} />

                            </ul>
                        </div>
                    </div>
                    {/* Carousel */}
                    <div className="col-md-10 ">
                        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ paddingLeft: '0', width: '100%' }}>
                            <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10", top: "0" }}>
                                <div className="d-flex" >
                                    <input className="form-control me-2 placeholder-dark" type="search" placeholder="Search" aria-label="Search" style={{ backgroundColor: 'white', color: 'black' }} value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                    <button className="custom-button" type="submit">Search</button>
                                </div>
                            </div>
                            <div className="carousel-inner">

                                <div className="carousel-item active">
                                    <img src={require('./1.jpg')} alt="Image1" className="d-block w-100" style={{ filter: "brightness(30%)", height: '500px', objectFit: 'cover' }} />
                                </div>
                                <div className="carousel-item">
                                    <img src={require('./3.jpg')} alt="Image2" className="d-block w-100" style={{ filter: "brightness(30%)", height: '500px', objectFit: 'cover' }} />
                                </div>
                                <div className="carousel-item">
                                    <img src={require('./2.jpg')} alt="Image3" className="d-block w-100" style={{ filter: "brightness(30%)", height: '500px', objectFit: 'cover' }} />
                                </div>

                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div>
                        <div className='container'>
                            <div className='row'>
                            {
                                merchItem != [] ? merchItem.filter((item) =>
                                    (item.name.toLowerCase().includes(search.toLowerCase()))
                                ).map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className='col-12 col-md-4 mb-4'>
                                            <Card_merch merchitem={filterItems}
                                            ></Card_merch>
                                        </div>
                                    )
                                }) : <div>no data </div>
                            }
                        </div>
                        </div> </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}
/*
{require('./cse_cricket1.jpg')} 
{require('./cse_crick.jpg')} 
{require('./cgpa.jpg')} 
{require('./cse_letter.jpg')} 
*/

/* 
                        <div className='fs-1'  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '25vh' }}>merch sob</div>
                        <div className='fs-1'  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '25vh' }}>ekhane hobe</div>
                        <div className='fs-1'  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '25vh' }}>meals er</div>
                        <div className='fs-1'  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '25vh' }}>cards er moto</div>



<li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false" style={{ color: 'black', fontSize: '1.3rem', fontWeight: 'bold' }}>
                                        <img src={Arrow} alt="arrow" style={{ width: '11px', height: '11px' }} />   Orders 
                                    </button>
                                    <div className="collapse" id="orders-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem' }} >New</Link></li>
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem' }}> Processed</Link></li>
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem' }}>Shipped</Link></li>
                                            <li><Link to="#" className="link-dark rounded " style={{ textDecoration: 'none', fontSize: '1rem' }} >Returned</Link></li>
                                        </ul>
                                    </div>
                                </li> */

/*  <li className="mb-1">
    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false" style={{ color: 'black', fontSize: '1.3rem', fontWeight: 'bold' }}>
        <img src={Arrow} alt="arrow" style={{ width: '11px', height: '11px' }} />   Account 
    </button>
    <div className="collapse" id="account-collapse">
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem' }}>New...</Link></li>
            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem' }}>Profile</Link></li>
            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem' }}>Settings</Link></li>
            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize: '1rem' }}>Sign out</Link></li>
        </ul>
    </div>
</li> */