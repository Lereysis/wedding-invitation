import React from 'react'

const NotFound = ({children}) => {
  return (
    <div className='border my-2 text-center d-flex' style={{ height:'350px'}}>
      <div className='m-auto'>
          {
            children || 
            (
              <>
                <h1>No hay datos Disponibles</h1>
                <h1>
                  <i className="bi bi-emoji-frown-fill"></i>
                </h1>
              </>
            )
          }
      </div>
    </div>
  )
}

export default NotFound

