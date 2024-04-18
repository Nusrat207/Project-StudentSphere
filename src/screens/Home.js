import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Top from '../components/Top'

export default function () {


    return (
        <div>
            <Top></Top>
            <Navbar></Navbar>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div style={{ fontSize:'5rem' }}>body</div>
            </div>
            <Footer></Footer>
        </div>
    )
}
