import React,{useState} from 'react'
import api from '@/services/api/api'
import { useSelector } from 'react-redux'


const FormGuest = () => {

    const [state,setState] = useState({
        name:'',
        numberPhone: '',
        numberGuest:''
    })

    const user = useSelector(state=> state.users.user)
    

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value,

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!state.name.length || !state.numberPhone.length || !state.numberGuest.length ){
            return alert("son obligatorios los campos")
        }

        await api.post('/guest',{
            email: JSON.parse(localStorage.getItem('user')).email,
            ...state
        })

        setState({
            name:'',
            numberPhone: '',
            numberGuest:''
        })
    }

    return (
        <form onSubmit={handleSubmit} className='row'>
            <div className="col-lg-4 mb-3">
                <label htmlFor="emailOrUser" className="form-label">Nombre de el invitado</label>
                <input onChange={handleChange} name='name' value={state.name} type="text" className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="col-lg-4 mb-3">
                <label htmlFor="password" className="form-label">Numero de invitados</label>
                <input onChange={handleChange} name='numberGuest' value={state.numberGuest} type="number" className="form-control"/>
            </div>
            <div className="col-lg-4 mb-3">
                <label htmlFor="password" className="form-label">Numero de telefono</label>
                <input onChange={handleChange} name='numberPhone' value={state.numberPhone} type="tel" className="form-control"  />
            </div>
            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    )
}

export default FormGuest