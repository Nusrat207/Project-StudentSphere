import React, { useState } from 'react'

import { useDispatchCart2} from './contextred2'
export default function Card_merch(props) {
    
    //let data = useCart2();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('xs');

    let dispatch2 = useDispatchCart2();
    const addToCart2 = async () => {
        await dispatch2({ type: "ADD2", id: props.merchitem._id, name: props.merchitem.name, size: size, price: finalPrice, quantity: quantity, image: props.merchitem.image })
       // console.log(data);
    }
    let finalPrice = (quantity * parseInt(props.merchitem.price));
    return (

        <div>
            <div className="card" mt-3 style={{ maxHeight: "450px", width: "380px", backgroundColor: 'white' }}>
                <img src={`/images/${props.merchitem.image}`} className="card-img-top" alt="..." style={{ height: "270px", objectFit: "cover" }} />
                <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h5 className="card-title" style={{ color: 'black' }}>{props.merchitem.name}</h5></div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h5 className="card-title" style={{ color: 'black' }}> {props.merchitem.price}Tk</h5></div>
                    <hr style={{ color: 'black', backgroundColor: 'black', marginBottom: '1px' }}></hr>
                    <div className='container w-100' style={{ marginTop: '1px', fontWeight: 'lighter', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>
                        Quantity <select className='m-2 h-100 rounded' style={{ color: '#d7f7f5', backgroundColor: '#092b29', border: '2px solid white' }} onChange={(e) => setQuantity(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                )
                            })}
                        </select>
                        Size  <select className='m-2 h-100 rounded' style={{ color: '#d7f7f5', backgroundColor: '#092b29', border: '2px solid white' }} onChange={(e) => setSize(e.target.value)}>
                            {["XS", "S", "M", "L", "XL", "XXL"].map((size, index) => (
                                <option key={index} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='container w-100' style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="btn btn-primary" style={{ backgroundColor: '#d9fcf3', color: '#12403c ', fontWeight: 'bold', marginLeft: '10px', justifyContent: 'center' }} onClick={addToCart2}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
