import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchListGuest,setPages } from '@/redux/Slices/guestSlice'
import exportFromJSON from 'export-from-json'
import useUser from '@/hooks/useUser'
import paginate from '@/utils/paginate'


const ListGuest = () => {
    const dispatch = useDispatch()
    const listGuests = useSelector( state => state.guests.listGuests)
    const metadaListGuests = useSelector( state => state.guests.metadaListGuests)
    const pages = useSelector( state => state.guests.pages)
    const [totalGuests, setTotalGuests] = useState(0)
    const [searchNameGuest, setSearchNameGuest] = useState('')
    const {user} = useUser()
    useEffect(()=>{
        dispatch(fetchListGuest(user.email,0,searchNameGuest))
        dispatch(setPages([...paginate(metadaListGuests.totalGuests, 0).pages])) 
        let data = []
        listGuests.forEach( info => {
            data.push(...info.Accompanists)
        })
        setTotalGuests(data.length)
    },[metadaListGuests.totalGuests])


    const downloadData = () => {
        let data = []
        listGuests.forEach( info => {
            data.push(...info.Accompanists.map( accompanist => {
                return {
                    Familia: info.name,
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
    const handleSearchGuest = (event) => {
        setSearchNameGuest(event.target.value)
        dispatch(fetchListGuest(user.email,0,event.target.value))
        dispatch(setPages([...paginate(metadaListGuests.totalGuests, 0).pages]))
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
                        Total de invitados: { metadaListGuests.totalGuests }
                    </h3>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-lg-6'>
                    <div className="input-group mb-3 ">
                        <input onChange={ handleSearchGuest } type="text" className="form-control" placeholder="Ingresa tu busqueda por nombre" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-primary" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                    </div>
                </div>
                <div className='col-12 col-lg-6'>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={ `page-item ${ metadaListGuests.previous || 'disabled'}` }>
                                <a className="page-link" onClick={ () => dispatch(fetchListGuest(user.email, metadaListGuests.previous - 1, searchNameGuest))}><i className="bi bi-chevron-left"></i></a>
                            </li>
                            {
                                pages?.map(page => (
                                    <li key={page} className={`page-item ${ metadaListGuests.page === page && 'active'}`}><a onClick={ () => dispatch(fetchListGuest(user.email, page - 1, searchNameGuest))} className="page-link" >{page}</a></li>
                                ))
                            }
                            
                            <li className={ `page-item ${ metadaListGuests.next || 'disabled'}` }>
                                <a className="page-link" onClick={ () => dispatch(fetchListGuest(user.email, metadaListGuests.next - 1, searchNameGuest))}><i className="bi bi-chevron-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='cards gap-4 h-100'>
                {
                    listGuests.map( guest => {
                        return (
                                <div key={guest.id} className="card px-0">
                                    <div className="card-header text-center fw-bold">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            {guest.name}
                                            <Link to={`/detalle-invitacion/${guest.id}/${guest.name}`} className="btn btn-outline-primary">
                                                <i className="bi bi-box-arrow-up-right"></i>
                                            </Link>
                                        </div>
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
                                                    <li key={accompanist.id} className="list-group-item">
        
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