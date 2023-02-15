import React from 'react'

const FormGuest = () => {
    return (
        <form className='row'>
            <div className="col-lg-4 mb-3">
                <label for="emailOrUser" className="form-label">Nombre de el invitado</label>
                <input type="email" className="form-control" id="emailOrUser" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="col-lg-4 mb-3">
                <label for="password" className="form-label">Numero de invitados</label>
                <input type="password" className="form-control" id="password" />
            </div>
            <div className="col-lg-4 mb-3">
                <label for="password" className="form-label">Numero de telefono</label>
                <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    )
}

export default FormGuest