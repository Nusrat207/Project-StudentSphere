import React from 'react'
import Navbar from '../components/Navbar'
import Top from '../components/Top'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import './styles.css';
import Arrow from '../screens/rightsym.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import Card_merch from '../components/Card_merch';

export default function () {

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [search, setSearch] = useState('');

    const [merchItem, setmerchItem] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const [selectedBrands, setSelectedBrands] = useState([]);

    const navigate = useNavigate();
    const handleReset = () => {
        setFilteredItems([]);
        setMinPrice('');
        setMaxPrice('');
        navigate("/btm");
    }
    const handleBrandFilter = (brand) => {
        const index = selectedBrands.indexOf(brand);
        if (index === -1) {
            setSelectedBrands([...selectedBrands, brand]);
        } else {
            const updatedBrands = [...selectedBrands];
            updatedBrands.splice(index, 1);
            setSelectedBrands(updatedBrands);
        }
    };

    const handleClearAllBrands = () => {
        setSelectedBrands([]);
    };

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/MerchData", {
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

    const handlePriceFilter = () => {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
            const filtered = merchItem.filter(item => item.price >= min && item.price <= max &&
                item.tag === "dept BTM");
            setFilteredItems(filtered);
        }
    };

    return (
        <div>
            <Top />
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-2 " style={{ paddingRight: '0px', paddingLeft: '0px' }} >

                    <div className="flex-shrink-0 " style={{ width: '100%', height: '100%', paddingRight: '0px', backgroundColor: '#212529', paddingLeft: '25px', paddingTop: '10px' }}>
                            <div className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                                <span className="fs-4 fw-semibold" style={{ color: 'white' }}>Categories</span>
                            </div>
                            <ul className="list-unstyled ps-0">
                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true" style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold' }}>
                                        &gt;Central
                                    </button>
                                    <div className="collapse show" id="home-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            {/* <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize:'1rem' }} >Summer</Link></li>
                                            <li><Link to="#" className="link-dark rounded" style={{ textDecoration: 'none', fontSize:'1rem' }}>Winter</Link></li> */}
                                            <li>
                                                <Link to="/summer" style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', paddingLeft: '35px', textDecoration: 'none' }}>
                                                    Summer
                                                </Link>


                                            </li>
                                            <Link to="/winter" style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', paddingLeft: '35px', textDecoration: 'none' }}>
                                                Winter
                                            </Link>

                                            <li>

                                            </li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false" style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold' }}>
                                        &gt; Departmental
                                    </button>
                                    <div className="collapse" id="dashboard-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" >
                                            <li><Link to="/cse" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px', color: 'white' }} >CSE</Link></li>
                                            <li><Link to="/eee" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px', color: 'white' }}>EEE</Link></li>
                                            <li><Link to="/mpe" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px', color: 'white' }}>MPE</Link></li>
                                            <li><Link to="/cee" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px', color: 'white' }}>CEE</Link></li>
                                            <li><Link to="/btm" style={{ textDecoration: 'none', fontSize: '1rem', paddingLeft: '40px', color: 'white' }}>BTM</Link></li>
                                        </ul>
                                    </div>
                                </li>

                                <hr style={{ height: '2px', color: 'black', border: '2px solid black', marginBottom: '40px' }} />


                                <li className="mb-1" style={{ marginLeft: '10px' }}>
                                    <div className="d-flex align-items-center">
                                        <span className="fs-5 fw-semibold" style={{ color: 'white', marginBottom: '10px' }}>Price Range</span>
                                    </div>
                                    <div>

                                        <input type="number" placeholder="Min Price" step="1" value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)} style={{ marginBottom: '10px', backgroundColor: 'white', color: 'black', width: '150px' }} />
                                        <input type="number" placeholder="Max Price" step="1" value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)} style={{ marginBottom: '10px', backgroundColor: 'white', color: 'black', width: '150px' }} />
                                        <div>  <button className="btn" onClick={handlePriceFilter} style={{ marginBottom: '10px', backgroundColor: 'white', color: 'black', fontWeight: 'bold' }} >Apply</button>    </div>
                                        <div>
                                        <button className="btn" onClick={handleReset} style={{ marginBottom: '10px', marginTop:'5px',backgroundColor: 'transparent', color: 'white', fontWeight: 'italic',  borderColor:'white' }} >Reset</button>    
                                        </div>
                                    </div>
                                </li>
 
                                {/* adding brand filter */}
                                <hr style={{ height: '2px', color: 'black', border: '2px solid black', marginBottom: '40px' }} />

                                <li className="mb-1" style={{ marginLeft: '10px' }}>
                                    <div className="d-flex align-items-center">
                                        <span className="fs-5 fw-semibold" style={{ color: 'white', marginBottom: '10px' }}>Brands</span>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <div className="form-check" style={{ marginBottom: '10px' }}>
                                            <input className="form-check-input" type="checkbox" value="portify" id="brandPortify" checked={selectedBrands.includes('sportify')} onChange={() => handleBrandFilter('sportify')} />
                                            <label className="form-check-label" htmlFor="brandPortify" style={{ color: 'white' }}>
                                                Sportify
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ marginBottom: '10px' }}>
                                            <input className="form-check-input" type="checkbox" value="frostix" id="brandFrostix" checked={selectedBrands.includes('frostix')} onChange={() => handleBrandFilter('frostix')} />
                                            <label className="form-check-label" htmlFor="brandFrostix" style={{ color: 'white' }}>
                                                Frostix
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ marginBottom: '10px' }}>
                                            <input className="form-check-input" type="checkbox" value="teerific" id="brandTeerific" onChange={() => handleBrandFilter('teerific')} checked={selectedBrands.includes('teerific')} />
                                            <label className="form-check-label" htmlFor="brandTeerific" style={{ color: 'white' }}>
                                                Teerific
                                            </label>
                                        </div>
                                        <div className="form-check" style={{ marginBottom: '10px' }}>
                                            <input className="form-check-input" type="checkbox" value="unijacket" id="brandUniJacket" onChange={() => handleBrandFilter('unijacket')} checked={selectedBrands.includes('unijacket')} />
                                            <label className="form-check-label" htmlFor="brandUniJacket" style={{ color: 'white' }}>
                                                UniJacket
                                            </label>
                                        </div>
                                    </div>
                                    <div> <button className="btn" onClick={handleClearAllBrands} style={{ marginBottom: '10px', marginTop: '5px', backgroundColor: 'transparent', color: 'white', fontWeight: 'italic', borderColor: 'white' }}>
                                        Clear All</button>    </div>
                                </li>


                                {/* shesh filter */}
                            </ul>
                        </div>
                    </div>
                    {/* Carousel */}
                    <div className="col-md-10 ">
                        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ paddingLeft: '0', width: '100%' }}>
                            <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10", top: "0" }}>
                                <div className="d-flex" >
                                    <input className="form-control me-2 placeholder-dark" type="search" placeholder="Search" aria-label="Search" style={{ backgroundColor: 'white', color: 'black' }} value={search} onChange={(e) => { setSearch(e.target.value) }} />
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
                                    
                                {(filteredItems.length > 0 ? filteredItems : merchItem)
                                        .filter(item => selectedBrands.length === 0 || selectedBrands.includes(item.brand.toLowerCase()))
                                        .filter(item =>
                                            item.name.toLowerCase().includes(search.toLowerCase()) &&
                                            item.tag === "dept BTM"
                                        )
                                        .map(filterItems => (
                                            <div key={filterItems._id} className='col-12 col-md-4 mb-4'>
                                                <Card_merch merchitem={filterItems} />
                                            </div>
                                        ))
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