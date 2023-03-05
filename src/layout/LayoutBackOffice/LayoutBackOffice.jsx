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
                <div className='my-5 mvh-85'>
                    {children}
                </div>
                <Footer/>
            </>
        </ProtectedRoute>
    )
}

export default LayoutBackOffice