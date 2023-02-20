import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchGuests } from '@/redux/Slices/guestSlice'
import api from '@/services/api/api'

const TableGuest = () => {
    const guests = useSelector(state => state.guests.guests)
    const loadingGuest = useSelector(state => state.guests.loadingStateListGuests)
    const loadingAddGuest = useSelector(state => state.guests.loadingStateAddGuest)
    const user = useSelector(state => state.users.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchGuests(user.email))
    },[dispatch,loadingGuest,loadingAddGuest])

    const sendWhatsapp = async (message,number) => {
        await api.post('/send-message',{
            number,
            message: `${window.location.origin}/${message}`
        })
    }
    return (
        <div className="table-responsive">
            <div className='d-flex gap-3'>
                <h3> Total de invitados: {guests.length + guests.reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest),0)}</h3>
                <h3> Confirmados: {guests.filter( guest => guest.isConfirmed === true).length + guests.filter( guest => guest.isConfirmed === true).reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest),0)}</h3>
                <h3> Por confirmar: {guests.filter( guest => guest.isConfirmed === false).length + guests.filter( guest => guest.isConfirmed === false).reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest),0)}</h3>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre de invitado</th>
                        <th scope="col">Nro de acompañantes</th>
                        <th scope="col">Confirmación</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Nro de Whatsapp</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        guests.map(e => {
                            return (
                                <tr>
                                    <td>{e.name}</td>
                                    <td>{e.numberGuest}</td>
                                    <td>{!e.isConfirmed ? (<span className="badge text-bg-warning">No cofirmado</span>) : (<span className="badge text-bg-success">Confirmado</span>) }</td>
                                    <td><a href={e.slug} target="_blank" rel="noopener noreferrer">{e.slug} <i class="bi bi-box-arrow-up-right"></i></a></td>
                                    <td>{e.numberPhone}</td>
                                    <td>
                                        <div className='d-flex gap-1'>
                                            <span  type="button" class="btn btn-secondary">
                                                <i class="bi bi-pencil-square"></i>
                                            </span>
                                            <span  type="button" class="btn btn-secondary">
                                                <i class="bi bi-trash"></i>
                                            </span>
                                            <span onClick={()=>sendWhatsapp(e.slug,e.numberPhone)} type="button" class="btn btn-secondary">
                                                <i class="bi bi-whatsapp"></i>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableGuest