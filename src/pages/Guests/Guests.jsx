import React, { useEffect, useState } from 'react'
import FormGuest from './Components/FormGuest/FormGuest'
import TableGuest from './Components/TableGuest/TableGuest'
import api from '@/services/api/api'
import {Link} from 'react-router-dom'
import QRCode from 'react-qr-code'
const Guests = () => {
  const [valQR, setValQR] = useState('')
  const loginWhatsapp = async () => {
    const response = await api.get('/qr-whatsapp')
    setValQR(response.data.body)
  }

  return (
    <div className='container'>
        { valQR.length && (<div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
              <QRCode
                size={300}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={valQR}
                viewBox={`0 0 300 300`}
              />
          </div>)
        }
        <button onClick={() => loginWhatsapp() } className='btn btn-primary'> Iniciar Sesion en Whatsapp </button>
        <FormGuest/>
        <TableGuest/>
    </div>
  )
}

export default Guests