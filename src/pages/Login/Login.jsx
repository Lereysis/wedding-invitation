import React from 'react'

const Login = () => {
    return (
        <div className='container'>
            <form>
                <div className="mb-3">
                    <label for="emailOrUser" className="form-label">Nombre De usuario o Correo Electronico</label>
                    <input type="email" className="form-control" id="emailOrUser" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login