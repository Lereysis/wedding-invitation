import React, {useEffect} from 'react'
import LogOut from '@/services/LogOut/LogOut'
import { Link } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import useUser from '@/hooks/useUser'

const Navbar = () => {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, [])
    const { user } = useUser()
    return (
        <nav className="navbar navbar-primary bg-primary navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <div className="navbar-brand">
                    <div className='d-flex logo-brand align-items-center text-white gap-1'>
                        <span>
                            Manager
                            <br />
                            Invitation
                        </span>
                        <i className="bi bi-envelope-paper-heart-fill"></i>
                    </div>
                </div>
                <button className="d-block d-lg-none btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-list"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav gap-3 mt-3 mt-lg-0 ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/administracion-invitados" className='btn btn-outline-secondary'> Admin de invitaciones </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/lista-de-invitados" className='btn btn-outline-secondary'> Lista de invitados </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/whatsapp-web-js" className='btn btn-outline-secondary'> Iniciar Sesion en Whatsapp </Link>
                        </li>
                        <li className='nav-item' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title={`Has iniciado sesión con el correo ${user.email}`}>
                            <div style={{ height:'2.2rem', width:'2.2rem'}}>
                                <img className='img-fluid rounded-circle' src={user.imgUrl} alt="Imagen de usuario" />
                            </div>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => LogOut()} className="btn btn-outline-secondary" type="button" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Cerrar Sesión">
                                <i className="bi bi-box-arrow-left"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar