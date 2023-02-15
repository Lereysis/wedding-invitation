import React from 'react'
import { Link } from 'react-router-dom'
const Welcome = () => {
  return (
    <div className='container'>
        <h1>
            Bienvenido a tu sistema de invitacion
        </h1>
        <p>
            Podras crear tu lista de invitados para tu ocasion especial y podras enviarlo a traves de whatsapp
        </p>
        <p> 
            Elige una opcion dependiendo de tu caso
        </p>
        <div>
            <Link to="/iniciar-sesion" className='btn btn-primary'>Iniciar Sesion</Link>
            <Link to="/registro" className='btn btn-outline-secondary'>Registrarse</Link>
        </div>
    </div>
  )
}

export default Welcome