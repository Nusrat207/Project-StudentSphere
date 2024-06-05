import React, { useEffect, useState } from 'react'
import Top from "../components/Top";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function MealHistory() {
    const [orderData, setorderData] = useState({})
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('student_id'))
        await fetch("http://localhost:5000/api/myFoodOrder", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id: localStorage.getItem('student_id')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })

    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
        <Top />
        <Navbar />

        <div className='container'>
            <div className='row'>
                {orderData && orderData.orderData && orderData.orderData.order_data && orderData.orderData.order_data.map((arrayData) => (
                    <div key={arrayData._id} className='col-12 col-md-6 col-lg-3'>
                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "390px" }}>
                            <img src={arrayData.image} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                            <div className="card-body">
                                <h5 className="card-title">{arrayData.name}
                                
                               
                                </h5>
                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                <span className='m-1'> x{arrayData.quantity}</span>
                                    
                                    <span className='m-1'>{arrayData.order_date}</span>
                                   
                                    <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                    ৳{arrayData.price}
                                    </div>
                                    <div> <span className='m-2'>{arrayData.shop} shop</span> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </div>
    )
}
