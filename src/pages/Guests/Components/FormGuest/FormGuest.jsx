import React,{useState} from 'react'
import api from '@/services/api/api'
import { useSelector, useDispatch } from 'react-redux'
import { updatedState,resetStateLoading } from '@/redux/Slices/guestSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useUser from '@/hooks/useUser'
import validate from '@/helpers/validate'

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

    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const {user} = useUser()

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
        setErrors(validate({                 
            ...state,                        
            [e.target.name] : e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(resetStateLoading('loadingStateAddGuest'))
        if(errors.name || errors.numberPhone || errors.numberGuest){

            MySwal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Tienes un error en los campos!',
            })
            return
        }

        if(!state.name.length || !state.numberPhone.length || !state.numberGuest.length || !state.messageCustomize.length){

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
        
        try {
            await api.post('/guest',{
                email: user.email,
                ...state,
                messageCustomize: state.messageCustomize.replace('[name]', state.name)
            })
        } catch (error) {
            console.log(error)
            MySwal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'El número que intentas ingresar ya existe ❌, si el problema persiste deberas contactarte con soporte 👀.',
            })
            return
        }
        dispatch(updatedState('loadingStateAddGuest'))
        MySwal.fire({
            toast:true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Se ha agregado correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        setState({
            name:'',
            numberPhone: '',
            numberGuest:'',
            messageCustomize:messageDefault
        })
    }

    return (
        <div className='offcanvas offcanvas-start' tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h4 className="offcanvas-title" id="offcanvasLabel">Agrega tu invitado</h4>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={handleSubmit} className='row'>
                    <div className="col-lg-12 mb-3">
                        <label htmlFor="emailOrUser" className="form-label">Nombre del invitado</label>
                        <input onChange={e => handleChange(e)} name='name' value={state.name} type="text" className="form-control" aria-describedby="emailHelp" />
                        {errors.name && (<p className='text-danger'>{errors.name}</p>)}
                    </div>
                    <div className="col-lg-12 mb-3">
                        <label htmlFor="password" className="form-label">Número de invitados</label>
                        <input onChange={handleChange} name='numberGuest' value={state.numberGuest} type="number" className="form-control"/>
                        {errors.numberGuest && (<p className='text-danger' >{errors.numberGuest}</p>)}
                    </div>
                    <div className="col-lg-12 mb-3">
                        <label htmlFor="password" className="form-label">Número de teléfono</label>
                        <small className='d-block'>(Recuerda escribir el codigo de el pais sin el +) </small>
                        <input onChange={handleChange} name='numberPhone' value={state.numberPhone} type="tel" className="form-control"  />
                        {errors.numberPhone && (<p className='text-danger' >{errors.numberPhone}</p>)}
                    </div>
                    <div className="col-lg-12 mb-3">
                        <label htmlFor="message" className="form-label">Mensaje perzonalizado para el invitado</label>
                        <small className='d-block'>(Tienes "[name]" para personalizar el mensaje con el nombre del invitado) </small>
                        <textarea onChange={handleChange} className='form-control' id="message" name="messageCustomize" value={state.messageCustomize}  rows="8"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Agregar</button>
                </form>
            </div>
        </div>
    )
}

export default FormGuest