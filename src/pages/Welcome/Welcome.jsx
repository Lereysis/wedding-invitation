import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import login from '../../services/LoginAuth/Login'
import { useNavigate } from 'react-router-dom'
const Welcome = () => {
  const navigate = useNavigate()
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      navigate('/administracion-invitados')
    }
  }, [])
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
            <button onClick={login} className='btn btn-primary'>Iniciar Con google</button>
            <button  className='btn btn-outline-secondary'>Registrarse</button>
        </div>
    </div>
  )
}

export default Welcome