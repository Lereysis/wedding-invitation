import React, { useEffect } from 'react'
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
const LayoutBackOffice = ({ children }) => {
    useEffect(() => {

    })
    return (
        <ProtectedRoute>
            <>
                <Navbar/>
                <div className='h-100 my-5'>
                    {children}
                </div>
                <Footer/>
            </>
        </ProtectedRoute>
    )
}

export default LayoutBackOffice