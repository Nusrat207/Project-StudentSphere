import React from 'react'
import { useCart2, useDispatchCart2 } from '../components/contextred2';

import { ReactComponent as TrashIcon } from '../screens/trash.svg'
export default function () {
    let mdata = useCart2();
    let dispatch = useDispatchCart2();

    if (mdata.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let student_id = localStorage.getItem("student_id");
        console.log(mdata,student_id,new Date())
        let response = await fetch("http://localhost:4000/api/OrderDataMerch", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id: student_id,
                order_data: mdata,
                
                order_date: new Date().toDateString()
            })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    } 
   

    let totalPrice = mdata.reduce((total, item) => total + item.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive-sm table-responsive-md'>
                <table className='table table-hover' >
                    <thead className='text-success' style={{fontSize:'1.9rem', fontStyle:'italic'}}>
                        <tr  >
                            <th scope='col'>#</th>
                           
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Size</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>

                    </thead>
                    <tbody >
                        {
                            mdata.map((item, index) => (
                                <tr style={{fontSize:'1.4rem',color:'#dcdede'}}>
                                    <th scope='row'>{index + 1}</th>
                              

                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.size}</td>
                                    <td>{item.price}</td>
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
                <div><h1 className='fs-2'>Total Price: {totalPrice}TK</h1></div>
                <div className="d-flex justify-content-center mt-5">
                    <button className='btn btn-primary mt-5 ' style={{fontWeight:'bold',fontSize:'1.6rem'}} onClick={handleCheckOut}> ORDER </button>
                </div>
            </div>



        </div>
    )
}