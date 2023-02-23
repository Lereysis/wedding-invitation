import React,{useState} from 'react'
import api from '@/services/api/api'
import { useSelector, useDispatch } from 'react-redux'
import { updatedState } from '@/redux/Slices/guestSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const messageDefault = `¡Querida familia [name]! 🤗 
Nos complace invitarlos a la celebración de nuestro amor en el día más especial de nuestras vidas. Por favor únanse a nosotros en nuestra boda para compartir la alegría, el amor y la felicidad en este día tan importante.

🎉 ¡Esperamos verlos pronto y compartir juntos este día inolvidable! 🎉

Pueden encontrar todos los detalles de la invitación en el siguiente enlace:`

const FormGuest = () => {
    const MySwal = withReactContent(Swal)

    const [state,setState] = useState({
        name:'',
        numberPhone: '',
        numberGuest:'',
        messageCustomize:messageDefault
    })
    const dispatch = useDispatch()
    const user = useSelector(state=> state.users.user)
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!state.name.length || !state.numberPhone.length || !state.numberGuest.length || !state.messageCustomize.length ){

            MySwal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Todos los campos son obligatorios!',
            })
            return
        }
        setState({
            ...state,
            messageCustomize: state.messageCustomize.replace('[name]', state.name)
        })
        await api.post('/guest',{
            email: user.email,
            ...state
        })
        dispatch(updatedState('loadingStateAddGuest'))
        setState({
            name:'',
            numberPhone: '',
            numberGuest:'',
            messageCustomize:messageDefault
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
            <div className="col-lg-12 mb-3">
                <label htmlFor="message" className="form-label">Mensaje perzonalizado para el invitado</label>
                <textarea onChange={handleChange} className='form-control' id="message" name="messageCustomize" value={state.messageCustomize}  rows="8"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    )
}

export default FormGuest