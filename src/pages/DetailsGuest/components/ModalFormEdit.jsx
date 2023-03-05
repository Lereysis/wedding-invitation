import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatedState,resetStateLoading } from '@/redux/Slices/guestSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import validate from '@/helpers/validate'
import api from '@/services/api/api'


const ModalFormEdit = () => {
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()

    const selectedAccompanist = useSelector(state => state.guests.selectedAccompanist)
    
    const [infoAccompanist,setInfoAccompanist] = useState({})
    const [errors, setErrors] = useState({})

    useEffect( () => {
        setInfoAccompanist({...selectedAccompanist})
    },[selectedAccompanist])

    const handleChange = (event) => {
        setInfoAccompanist({
            ...infoAccompanist,
            [event.target.name] : event.target.value
        })
        setErrors(validate({                 
            ...infoAccompanist,                        
            [event.target.name] : event.target.value
        }))
    }

    const handleClick = async () => {
        // dispatch(resetStateLoading('loadingStateAddGuest'))

        if(errors.name || errors.identifier || errors.age){

            MySwal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Tienes un error en los campos!',
            })
            return
        }

        if(!infoAccompanist.name.length || !infoAccompanist.identifier.length || !infoAccompanist.age.length ){

            MySwal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Todos los campos son obligatorios!',
            })
 
            return
        }
        dispatch(resetStateLoading('loadingStateChangeState'))   
        await api.put('/Accompanist',{oldAccompanist:{...selectedAccompanist},newAccompanist:{...infoAccompanist}})
        dispatch(updatedState('loadingStateChangeState'))

        MySwal.fire({
            toast:true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Se ha actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <div  className="modal fade" id="modalEditGuest" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"  aria-labelledby="modalEditGuestLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalEditGuestLabel">Editar Invitado</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div className="mb-3">
                                <label htmlFor="name-guest" className="col-form-label">Nombre</label>
                                <input onChange={handleChange} type="text" className="form-control" id="name-guest" value={infoAccompanist.name} name="name"/>
                                {errors.name && (<p className='text-danger'>{errors.name}</p>)}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="number-phone" className="col-form-label">Identificador</label>
                                <input onChange={handleChange} type="text" className="form-control" id="number-phone" value={infoAccompanist.identifier} name="identifier" />
                                {errors.identifier && (<p className='text-danger' >{errors.identifier}</p>)}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="number-guest" className="col-form-label">Edad</label>
                                <input onChange={handleChange} type="text" className="form-control" id="number-guest" value={infoAccompanist.age} name="age" />
                                {errors.age && (<p className='text-danger'>{errors.age}</p>)}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button onClick={() => handleClick()} type="button" className="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalFormEdit