import React, { useEffect, useState } from 'react'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import FormGuest from './Components/FormGuest/FormGuest'
import TableGuest from './Components/TableGuest/TableGuest'

const Guests = () => {

  useEffect(()=>{
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  },[])

  return (
    <>
      <button className="btn btn-primary rounded-circle btn-float" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" >
        <i class="bi bi-person-plus-fill" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Crear nuevo invitado"></i>
      </button>
      <div className='container py-5'>
        <div className='row'>
          <FormGuest />
          <TableGuest />
        </div>
      </div>
    </>
  )
}

export default Guests