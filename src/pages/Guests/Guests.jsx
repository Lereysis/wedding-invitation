import React from 'react'
import FormGuest from './Components/FormGuest/FormGuest'
import TableGuest from './Components/TableGuest/TableGuest'

const Guests = () => {
  return (
    <div className='container'>
        <FormGuest/>
        <TableGuest/>
    </div>
  )
}

export default Guests