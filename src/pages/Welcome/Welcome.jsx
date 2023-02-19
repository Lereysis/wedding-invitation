import React, { useEffect, useState } from 'react'
import api from '@/services/api/api'
import login from '../../services/LoginAuth/Login'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/configAuth/authFirebase'
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/Slices/usersSlice'


const Welcome = () => {
  const navigate = useNavigate()
  const [authToken, setAuthToken] = useState(null)
  const [userLocal, setUserLocal] = useState(null)
  const dispatch = useDispatch()


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserLocal(user)
        setAuthToken(localStorage.getItem('Auth Token'))
        if (authToken) {
          (async()=>{
            await api.post('/user',{
              name:userLocal.displayName,
              email:userLocal.email,
              numberPhone: ""
            })
          })()
          dispatch(setUser(userLocal))
          navigate('/administracion-invitados')
        }
      } else {

      }
    });
  }, [userLocal,authToken])
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