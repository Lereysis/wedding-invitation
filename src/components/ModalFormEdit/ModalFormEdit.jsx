import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatedState,resetStateLoading } from '@/redux/Slices/guestSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';


import api from '@/services/api/api'


const ModalFormEdit = () => {
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()

    const selectedGuest = useSelector(state => state.guests.selectedGuest)
    
    const [infoGuest,setInfoGuest] = useState({})
    
    useEffect( () => {
        setInfoGuest({...selectedGuest})
    },[selectedGuest])

    const handleChange = (event) => {
        setInfoGuest({
            ...infoGuest,
            [event.target.name] : event.target.value
        })
        console.log(infoGuest)
       
    }

    const handleClick = async () => {
        dispatch(resetStateLoading('loadingStateChangeState'))   
        await api.put('/guest',{oldGuest:{...selectedGuest},newGuest:{...infoGuest}})
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
        <div  className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Invitado</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div className="mb-3">
                                <label htmlFor="name-guest" className="col-form-label">Nombre de el invitado:</label>
                                <input onChange={handleChange} type="text" className="form-control" id="name-guest" value={infoGuest.name} name="name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="number-guest" className="col-form-label">Numero de invitados:</label>
                                <input onChange={handleChange} type="text" className="form-control" id="number-guest" value={infoGuest.numberGuest} name="numberGuest" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="number-phone" className="col-form-label">Numero de Telefono:</label>
                                <input onChange={handleChange} type="text" className="form-control" id="number-phone" value={infoGuest.numberPhone} name="numberPhone" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Mensaje perzonalizado para el invitado</label>
                                <textarea onChange={handleChange} className='form-control' id="message" name="messageCustomize" rows="8" value={infoGuest.messageCustomize}></textarea>
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