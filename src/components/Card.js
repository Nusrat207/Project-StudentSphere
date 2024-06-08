import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
import { Modal, Button } from 'react-bootstrap';

import Bag from '../components/bag.svg'
import Bell from './notif.png'

export default function Card(props) {

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showAddedToCartPopup, setShowAddedToCartPopup] = useState(false);

    useEffect(() => {
        let timer;
        if (showAddedToCartPopup) {
            timer = setTimeout(() => {
                setShowAddedToCartPopup(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showAddedToCartPopup]);

    let dispatch = useDispatchCart();
    let data = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleClose = () => setShowPopup(false);

    const addToCart = async () => {
        /* let food=[];
         for (const item of data) {
             if (item.id === props.fooditem._id) {
                 food = item;
                 break;
             }
         }
         if (food != []) {
             await dispatch({ type: "UPDATE", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, shop: props.fooditem.shop, quantity: quantity, image: props.fooditem.image })
             return;
         } else{
             await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, shop: props.fooditem.shop, quantity: quantity, image: props.fooditem.image })
             return
         } */
        const now = new Date();
        const timestamp = now.toLocaleString();


        const currentTime = new Date().getHours();
        const isMealAvailable = (mealType) => {
            if (mealType === 'Snacks') {
                return true;
            } else if (mealType === 'Breakfast' && currentTime >= 6 && currentTime < 11) {
                return true;
            } else if (mealType === 'Lunch' && currentTime >= 11 && currentTime < 16) {
                return true;
            } else if (mealType === 'Dinner' && currentTime >= 19 && currentTime <= 23) {
                return true;
            }
            return false;
        };

        if (isMealAvailable(props.fooditem.mealType)) {
            await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, meal:props.fooditem.mealType, price: finalPrice, shop: props.fooditem.shop, quantity: quantity, image: props.fooditem.image, time:timestamp })
            setShowAddedToCartPopup(true);
        } else {
            // alert(`Sorry, ${props.fooditem.mealType} is not available at this time.`);
            setPopupMessage(`Sorry, ${props.fooditem.mealType} is not available at this time.`);
            setShowPopup(true);
        }

        //console.log(props.fooditem.name, props.fooditem.mealType);

    }

    let finalPrice = (quantity * parseInt(props.fooditem.price));
    return (
        <div>
            <div> <div className="card" mt-3 style={{ "width": "18rem", "height": "340px" }}>
                <img src={props.fooditem.image} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h4 className="card-title">{props.fooditem.name}  {props.fooditem.price}</h4></div>
                    <hr></hr>
                    <div className='container w-100' style={{ fontWeight: 'lighter', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Quantity <select className='m-2 h-100 rounded' style={{ color: '#d7f7f5', backgroundColor: '#092b29', border: '2px solid white' }} onChange={(e) => setQuantity(e.target.value)}>
                            {Array.from(Array(9), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                )
                            })}
                        </select>


                        <button className="btn btn-primary" style={{ backgroundColor: '#d9fcf3', color: '#12403c ', fontWeight: 'bold', marginLeft: '10px' }} onClick={addToCart}>Add to Cart</button>

                        <Modal show={showPopup} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ fontFamily: 'courier new', fontSize: '16px', fontWeight: 'italic', opacity: 0.7 }}>Get your meal, right on time!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ fontSize: '25px', letterSpacing: '1.5px' }}>{popupMessage}</Modal.Body>
                            <Modal.Footer>
                                <Button style={{ backgroundColor: '#92e1f7', color: 'black' }} variant="secondary" onClick={handleClose}>
                                    Okay
                                </Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={showAddedToCartPopup} onHide={() => setShowAddedToCartPopup(false)}>
                            <Modal.Header closeButton>
                            <Modal.Title>
                            <img src={Bell}  style={{ width: '30px', marginRight: '9px' }} />
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{fontSize:'25px', fontWeight:'bold'}}>Item added to cart</Modal.Body>
                          
                        </Modal>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
