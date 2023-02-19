import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchGuests } from '@/redux/Slices/usersSlice'

const TableGuest = () => {

    const guests = useSelector(state => state.users.guests)
    console.log(guests)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchGuests(JSON.parse(localStorage.getItem('user')).email))
    },[dispatch])

    return (
        <div className="table-responsive">
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
                                    <td>{e.isConfirmed ? 'confirmada la asistencia' : 'Por confirmar asistencia'}</td>
                                    <td><a href={e.slug} target="_blank" rel="noopener noreferrer">{e.slug}</a></td>
                                    <td>{e.numberPhone}</td>
                                    <td>send Whatsapp</td>
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