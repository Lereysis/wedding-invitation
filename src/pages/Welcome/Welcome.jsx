import React, { useEffect, useState } from 'react'

import login from '../../services/LoginAuth/Login'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/configAuth/authFirebase'
import { onAuthStateChanged } from "firebase/auth";
const Welcome = () => {
  const navigate = useNavigate()
  const [authToken, setAuthToken] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user)
        setAuthToken(localStorage.getItem('Auth Token'))
        if (authToken) {
          navigate('/administracion-invitados')
        }
      } else {

      }
    });
  }, [user,authToken])
  return (
    <div className='container vh-100 d-flex justify-content-center align-items-center'>
      <div>
          <h1>Bienvenido a tu sistema de invitacion</h1>
          <p>Podras crear tu lista de invitados para tu ocasion especial y podras enviarlo a traves de whatsapp</p>
          <p>Debes tener una cuenta en Google</p>
          <div className='d-flex flex-column gap-3'>
              <button onClick={login} className='btn btn-primary text-uppercase'>Iniciar Con Google</button>
          </div>
      </div>
    </div>
  )
}

export default Welcome