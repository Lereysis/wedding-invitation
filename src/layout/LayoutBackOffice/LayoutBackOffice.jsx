import React, { useEffect } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
const LayoutBackOffice = ({ children }) => {
    useEffect(() => {

    })
    return (
        <ProtectedRoute>
            <div className='h-100 d-flex flex-column'>
                <Navbar/>
                <div className='h-100 my-5'>
                    {children}
                </div>
                <Footer/>
            </div>
        </ProtectedRoute>
    )
}

export default LayoutBackOffice