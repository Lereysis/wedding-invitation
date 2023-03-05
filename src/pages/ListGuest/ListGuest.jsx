import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListGuest } from '@/redux/Slices/guestSlice'
import exportFromJSON from 'export-from-json'
import useUser from '@/hooks/useUser'


const ListGuest = () => {
    const dispatch = useDispatch()
    const listGuests = useSelector( state => state.guests.listGuests)
    const [totalGuests, setTotalGuests] = useState(0)
    const {user} = useUser()
    useEffect(()=>{
        dispatch(fetchListGuest(user.email))
        let data = []
        listGuests.forEach( info => {
            data.push(...info.Accompanists)
        })
        setTotalGuests(data.length)
    },[dispatch,listGuests[0]?.name])

    const downloadData = () => {
        let data = []
        listGuests.forEach( info => {
            data.push(...info.Accompanists.map( accompanist => {
                return {
                    Nombre: accompanist.name,
                    Identificador: accompanist.identifier,
                    Edad:accompanist.age
                }
            }))
        })
        const fileName = `Lista_de_invitados_de_${user.name}`
        const exportType =  exportFromJSON.types.xls
        exportFromJSON({ data, fileName, exportType })
    }

    return (
        <div className='container h-100'>
            <div className='row mb-1'>
                <div className='w-auto pr-3 ms-auto'>
                    <button onClick={() => downloadData()} className='btn btn-secondary '>
                        <i className="bi bi-filetype-xlsx pe-2"></i>
                        Generar Excel
                    </button>
                </div>
            </div>
            <div className='row mb-4'>
                <div className='col-12'>
                    <h3>
                        <i className="bi bi-people-fill pe-2 text-primary"></i>
                        Total de invitados: { totalGuests }
                    </h3>
                </div>
            </div>
            <div className='cards gap-4 h-100'>
                {
                    listGuests.map( guest => {
                        return (
                                <div className="card px-0">
                                    <div className="card-header text-center fw-bold">
                                        {guest.name}
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className='list-group-item'>
                                                <div className='row'>
                                                        <div className='col-5'>
                                                            <span className='fw-bold'>Nombre</span>
                                                        </div>
                                                        <div className='col-5'>
                                                            <span className='fw-bold'>Identificador</span>
                                                        </div>
                                                        <div className='col-2'>
                                                            <span className='fw-bold'>Edad</span>
                                                        </div>
                                                </div>
                                        </li>
                                        {
                                            guest.Accompanists.map( accompanist => {
                                                return (
                                                    <li className="list-group-item">
        
                                                        <div className='row'>
                                                            <div className='col-5'>
                                                                <span>
                                                                    {accompanist.name}
                                                                </span>
                                                            </div>
                                                            <div className='col-5'>
                                                                <span>
                                                                    {accompanist.identifier}
                                                                </span>
                                                            </div>
                                                            <div className='col-2'>
                                                                <span>
                                                                    {accompanist.age}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListGuest