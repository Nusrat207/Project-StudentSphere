import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useState } from 'react';
import jsPDF from 'jspdf';
import bkash from './bkash.svg';
import COD from './cod.png';
import { ReactComponent as TrashIcon } from '../screens/trash.svg'
export default function () {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    const [receiptGenerated, setReceiptGenerated] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [transactionNumber, setTransactionNumber] = useState("");


    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    let studentId = localStorage.getItem("student_id");
    let orderData = "";
    let orderDate = "";
    const handleCheckOut = async () => {
        let student_id = localStorage.getItem("student_id");
        console.log(data, student_id, new Date())
        const location = selectedLocation;
        const payment = paymentMethod;
        console.log(location);
        console.log(payment);
        orderData = data;
        //console.log(orderData.shop);
        orderDate = new Date();
        let response = await fetch("http://localhost:5000/api/OrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id: student_id,
                order_data: data,
                order_date: new Date().toDateString(),
                location: location,
                payment: payment

            })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.ok) {
            let jsonRes = await response.json();
            if (jsonRes.success) {
                setReceiptGenerated(true);
                generatePDF();

            } else {
                console.error("Order failed:", jsonRes.message);
            }
        } else {

            console.error("Failed to fetch:", response.status);
        }
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    const timestamp = Date.now();
    const pdfName = `receipt_${timestamp}.pdf`;
   
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFont("Helvetica");
        const pageWidth = doc.internal.pageSize.width;
        const lineHeight = 8;
        const marginLeft = 10;
    
        doc.setFontSize(12);
        doc.text("CDS", pageWidth / 2, 20, { align: "center" });
        doc.setFontSize(10);
        doc.text("IUT, Boardbazar, Gazipur", pageWidth / 2, 30, { align: "center" });
    
        doc.setFontSize(16);
        doc.text("Receipt", pageWidth / 2, 50, { align: "center" });
    
        doc.setFontSize(10);
        doc.text(`Customer's Student ID: ${studentId}`, marginLeft, 70);
        doc.text(`Order Date: ${orderDate}`, marginLeft, 80);
    
        doc.setFontSize(12);
        doc.text("Order Details:", marginLeft, 100);
        doc.setFontSize(10);
        let currentY = 110;
        orderData.forEach((item, index) => {
            const itemText = `${item.shop} shop: ${item.name} x${item.quantity} - ${item.price.toFixed(2)} TK`;
        doc.text(itemText, marginLeft, currentY);
        currentY += lineHeight;
        });
    
        doc.setFontSize(12);
        doc.text(`Deliver To: ${selectedLocation}`, marginLeft, currentY + 10);

        doc.text(`Payment Method: ${paymentMethod}`, marginLeft, currentY + 20);
        if (paymentMethod === "bkash") {
            doc.text(`TrxID: ${transactionNumber}`, marginLeft, currentY + 30);
        }

        doc.save(pdfName);
    };
    
    
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive-sm table-responsive-md' >
                <table className='table table-hover' style={{ marginBottom: '30px', paddingBottom: '20px' }}>
                    <thead className='text-success' style={{ fontSize: '1.9rem', fontStyle: 'italic' }}>
                        <tr  >
                            <th scope='col'>#</th>
                            <th scope='col'>Shop</th>

                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>

                    </thead>
                    <tbody >
                        {
                            data.map((food, index) => (
                                <tr style={{ fontSize: '1.4rem', color: '#dcdede' }}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.shop}</td>

                                    <td>{food.name}</td>
                                    <td>{food.quantity}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                                            <TrashIcon />
                                        </button>
                                    </td>
                                </tr>
                            )
                            )

                        }
                    </tbody>

                </table>

                <div style={{ marginBottom: '30px' }}><h1 className='fs-2'>Total Price: {totalPrice}TK</h1></div>
                <div>
                    <label htmlFor="location" className="form-label fs-4">Select Location:</label>
                    <select className="form-select mb-3" id="location" onChange={handleLocationChange} value={selectedLocation}>
                        <option defaultValue>Select an option</option>
                        <option value="South Hall of Residence">South Hall of Residence</option>
                        <option value="North Hall of Residence">North Hall of Residence</option>
                        <option value="Female Hall of Residence">Female Hall of Residence</option>
                    </select>
                </div>
                <div>
                    <label className="form-label fs-4">Payment:</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethod" id="bkash" value="bkash" onChange={handlePaymentMethodChange} />
                        <label className="form-check-label" htmlFor="bkash">
                        Bkash <img src={bkash} alt="Cart Icon" style={{ width: '55px', marginRight:'0px' }} /> </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" onChange={handlePaymentMethodChange} />
                        <label className="form-check-label" htmlFor="cash">
                        Cash on Delivery <img src={COD} alt="Cart Icon" style={{ width: '25px', marginRight:'0px' }} />
                            </label>
                    </div>
                </div>
               
                {paymentMethod === "bkash" && (
                    <div>
                        <label htmlFor="phoneNumber" className="form-label fs-4">Phone Number:</label>
                        <input type="text" className="form-control mb-3" id="phoneNumber" value="01948360118" readOnly />
                        <label htmlFor="transactionNumber" className="form-label fs-4">Transaction Number:</label>
                        <input
                            type="text"
                            className="form-control mb-3"
                            id="transactionNumber"
                            value={transactionNumber}
                            onChange={(e) => setTransactionNumber(e.target.value)}
                        />
                    </div>
                )}
                <div className="d-flex justify-content-center mt-5">
                    <button className='btn btn-primary mt-5 ' style={{ fontWeight: 'bold', fontSize: '1.6rem', paddingBottom: '5px', marginBottom: '20px' }} onClick={handleCheckOut}> ORDER </button>
                </div>
            </div>

            {receiptGenerated && (
                <div>
                    <p>Your receipt has been generated!</p>
                    <a href={pdfName} target="_blank" download>Download Receipt</a>
                </div>
            )}
        </div>
    )
}
//<td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
//<td><img src={food.image} alt="Food" style={{ maxWidth: '50px', maxHeight: '50px' }}  /></td>