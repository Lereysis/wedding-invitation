import React, { useEffect, useState } from 'react'
import FormGuest from './Components/FormGuest/FormGuest'
import TableGuest from './Components/TableGuest/TableGuest'

import {Link} from 'react-router-dom'

const Guests = () => {
  
 
  // useEffect(()=>{
  //   (async ()=>{
  //     const response = await axios.get('http://localhost:4000/check-session')
  //     console.log(response)
  //   })()
  // },[valueQR])
  return (
    <div className='container'>
        
        <FormGuest/>
        <TableGuest/>
        <Link to='/administracion-invitados-qr' >Ver QR</Link>
    </div>
  )
}

export default Guests