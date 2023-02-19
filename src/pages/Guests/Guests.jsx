import React, { useEffect, useState } from 'react'
import FormGuest from './Components/FormGuest/FormGuest'
import TableGuest from './Components/TableGuest/TableGuest'
import api from '@/services/api/api'
import {Link} from 'react-router-dom'

const Guests = () => {
  
  const loginWhatsapp = async () => {
    await api.get('/qr-whatsapp')
  }

  return (
    <div className='container'>
        <button onClick={() => loginWhatsapp() } className='btn btn-primary'> Iniciar Sesion en Whatsapp </button>
        <FormGuest/>
        <TableGuest/>
    </div>
  )
}

export default Guests