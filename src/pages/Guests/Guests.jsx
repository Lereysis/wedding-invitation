import React, { useEffect, useState } from 'react'
import FormGuest from './Components/FormGuest/FormGuest'
import TableGuest from './Components/TableGuest/TableGuest'
import QRCode from "react-qr-code";
import axios from 'axios'

const Guests = () => {
  const [valueQR, setValueQR] = useState('')
  useEffect(()=>{
    (async ()=>{
      const response = await axios.get('http://localhost:4000/qr-whatsapp')
      setValueQR(response.data.body)
    })()
  },[])
  // useEffect(()=>{
  //   (async ()=>{
  //     const response = await axios.get('http://localhost:4000/check-session')
  //     console.log(response)
  //   })()
  // },[valueQR])
  return (
    <div className='container'>
        { valueQR.length && (<div style={{ height: "auto", margin: "0 auto", maxWidth: 380, width: "100%" }}>
            <QRCode
              size={500}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={valueQR}
              viewBox={`0 0 500 500`}
            />
        </div>)}
        <FormGuest/>
        <TableGuest/>
    </div>
  )
}

export default Guests