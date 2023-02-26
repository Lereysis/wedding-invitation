import React, { useEffect, useState } from 'react'
import api from '@/services/api/api'
import login from '../../services/LoginAuth/Login'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/configAuth/authFirebase'
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import useUser from '@/hooks/useUser'
import Footer from '@/components/Footer/Footer'


const Welcome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLocal = useUser()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        (async () => {
          const response = await api.get(`/user/${user.email}`)
          console.log(response)
          if (!response.data.body) {
              await api.post('/user', {
                name: user.displayName,
                email: user.email,
                numberPhone: ""
              }) 
          }
          navigate('/administracion-invitados')
          })()

      } else {

      }

    });
  }, [userLocal, auth])
  return (
    <>
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
      <Footer/>
    </>
  )
}

export default Welcome