import React from 'react'
import './NoMatch.scss'
import { Link } from 'react-router-dom';


const NoMatch = () => {
  return (
    <div className='container-not-found'>
      <h1>¡Ups al parecer hubo un error!</h1>
      <h1 style={{fontSize:'10rem'}} className='text-secondary fw-bold' >404</h1>
      <p>Pulsa en el botón para volver</p>
      <Link to="/administracion-invitados"><button className='btn btn-primary' style={{fontWeight:'600'}} >Inicio</button></Link>
    </div>
  )
}

export default NoMatch