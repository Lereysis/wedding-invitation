import React, { useEffect } from 'react'
import LogOut from '@/services/LogOut/LogOut'
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Link } from 'react-router-dom';
const LayoutBackOffice = ({ children }) => {
    useEffect(() => {

    })
    return (
        <ProtectedRoute>
            <>
                <nav className="navbar navbar-primary bg-primary navbar-expand-lg bg-body-tertiary">
                    <div className="container">
                        <div className="navbar-brand">
                            <div className='d-flex logo-brand align-items-center text-white gap-1'>
                                <span>
                                    Manager
                                    <br/>
                                    Invitation
                                </span>
                                <i className="bi bi-envelope-paper-heart-fill"></i>
                            </div>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav gap-3 ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/administracion-invitados" className='btn btn-outline-secondary'> Lista de invitados </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/whatsapp-web-js" className='btn btn-outline-secondary'> Iniciar Sesion en Whatsapp </Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => LogOut()} className="btn btn-outline-secondary" type="button">
                                        <i className="bi bi-box-arrow-left"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {children}
            </>
        </ProtectedRoute>
    )
}

export default LayoutBackOffice