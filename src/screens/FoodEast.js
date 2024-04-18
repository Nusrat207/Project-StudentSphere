import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Top from '../components/Top'
import Carousel from '../components/Carousel'
import Card from '../components/Card'

import { useState } from 'react'
import { useEffect } from 'react'
export default function  () {
    const [search, setSearch] = useState('');
    const [foodType, setfoodType] = useState([]);
    const [foodItem, setfoodItem] = useState([]);
    const [shop, setShop] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:4000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        console.log(response[0], response[1]);

        setfoodItem(response[0]);
        setfoodType(response[1]);
        
       
    }

    useEffect(() => {
        loadData()
    }, []) 

  return (

    <div> 
        <Top></Top>
        <Navbar></Navbar>
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='caroosel'>

                    <div className="carousel-caption d-none d-md-block" style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            <button className="btn btn-outline-success" text-white bg-success type="submit">Search</button>
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burgers" className="d-block w-100" style={{filter: "brightness(30%)", height:'450px',objectFit:"cover"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?fried-rice" className="d-block w-100" style={{filter: "brightness(30%)",height:'450px',objectFit:"cover"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?samosa" className="d-block w-100" style={{filter: "brightness(30%)",height:'450px',objectFit:"cover"}} alt="..." />
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
        </div>
        
         <div className='container'>
                {
                    foodType != []
                        ? foodType.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3' style={{backgroundColor:'#bff2ee', color:'#184d48', fontWeight:'bold'}}>{data.mealType}</div>
                                <hr />
                                {
                                    foodItem != [] ? foodItem.filter((item) => 
                                    (item.mealType === data.mealType) &&
                                    (item.name.toLowerCase().includes(search.toLowerCase())) &&
                                    (item.shop === 'east')
                                ).map(filterItems => {
                                        return (
                                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                               {/*  <Card foodName={filterItems.name}
                                                    price={filterItems.price}
                                                    imgSrc={filterItems.image}
                                                ></Card> */}
                                                <Card fooditem = {filterItems}
                                                ></Card> 
                                            </div>
                                        )
                                    }) : <div>no data </div>
                                }


                            </div>
                            )
                        }) : <div>""""</div>
                }


            </div> 
        
        <Footer></Footer>
    </div>
  )
}
