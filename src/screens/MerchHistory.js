
import React, { useState, useEffect } from 'react';
import Top from "../components/Top";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MerchHistory() {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchMyOrder = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/myMerchOrder", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        student_id: localStorage.getItem('student_id')
                    })
                });
                const data = await response.json();
                console.log("Response from server:", data);

                if (data && data.orderData && Array.isArray(data.orderData.order_data)) {
                    console.log("Order data received:", data.orderData.order_data);
                 
                    const flattenedData = data.orderData.order_data.flat().filter(item => item);
                    console.log("Flattened and filtered data:", flattenedData);
                    setOrderData(flattenedData);
                } else {
                    console.error("Invalid data format received:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchMyOrder();
    }, []);

    return (
        <div>
            <Top />
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 && orderData.map((item, index) => (
                        item.image && item.name && item.quantity && item.price && (
                            <div key={index} className='col-12 col-md-6 col-lg-3'>
                                <div className="card mt-3" style={{ width: "20rem", Height: "500px" }}>
                                    <img src={`/images/${item.image}`} className="card-img-top" alt="..." style={{ height: "190px", objectFit: "fill" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <span style={{marginRight:'5px'}}>Quantity- {item.quantity}, </span>
                                        <span style={{marginRight:'5px'}}>Size- {item.size},</span>
                                        <span>  {item.price}Tk</span>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}



