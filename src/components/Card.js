import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const [quantity, setQuantity] = useState(1);



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

        await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, shop: props.fooditem.shop, quantity: quantity, image: props.fooditem.image })
       
        //console.log(data);
    }

    //let optionn=props.option??{};
    //let priceOptions= Object.keys(optionn);


    let finalPrice = (quantity * parseInt(props.fooditem.price));
    return (
        <div> {/*<Link to="/foodDetail" style={{ textDecoration: 'none' }}>*/}
            <div> <div className="card" mt-3 style={{ "width": "18rem", "maxHeight": "360px" }}>
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

                        {/*   <select className='m-2 h-100 bg-success' rounded>
                        {
                            priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })
                        }
                    </select> 
                        <div className='d-inline h-100 fs-5'>total price</div> */}
                        <button className="btn btn-primary" style={{ backgroundColor: '#d9fcf3', color: '#12403c ', fontWeight: 'bold', marginLeft: '10px' }} onClick={addToCart}>Add to Cart</button>
                    </div>

                </div>
            </div>
            </div>  {/*</div> </Link> */}
        </div>
    )
}
