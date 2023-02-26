import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGuests, setSelectedGuest, updatedState, resetStateLoading,setPages } from '@/redux/Slices/guestSlice'
import api from '@/services/api/api'
import paginate from '@/utils/paginate'
import useUser from '@/hooks/useUser'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ModalFormEdit from '@/components/ModalFormEdit/ModalFormEdit'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import NotFound from '../../../../components/NotFound/NotFound'
import './TableGuest.scss'

const TableGuest = () => {
    const MySwal = withReactContent(Swal)
    const { pages, infoCountGuests } = useSelector( state => state.guests)
    const guests = useSelector(state => state.guests.guests)
    const loadingGuest = useSelector(state => state.guests.loadingStateListGuests)
    const loadingAddGuest = useSelector(state => state.guests.loadingStateAddGuest)
    const loadingStateDeleteGuest = useSelector(state => state.guests.loadingStateDeleteGuest)
    const loadingStateChangeState = useSelector(state => state.guests.loadingStateChangeState)
    const metaDataGuests = useSelector(state=> state.guests.metaDataGuests)
    const [searchNameGuest, setSearchNameGuest] = useState('')
    const [filterByConfirmation,setFilterByConfirmation] = useState('')
    const { user } = useUser()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGuests(user.email,0, searchNameGuest, filterByConfirmation))
        dispatch(setPages([...paginate(metaDataGuests.totalGuests, 0).pages])) 
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, [dispatch, user, loadingGuest, loadingAddGuest, loadingStateDeleteGuest, loadingStateChangeState, metaDataGuests.totalGuests])

    const sendWhatsapp = async (url, number, message) => {
        await api.post('/send-message', {
            number,
            url: `${window.location.origin}/${url}`,
            message
        })
    }
    
    const handleClickGuest = (guest) => {
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
        const myModalEl = document.getElementById('exampleModal')
        myModal.show(myModalEl)
        myModalEl.addEventListener('shown.bs.modal', () => {
            dispatch(setSelectedGuest(guest))
        })
    }

    const handleDelete = async (numberPhone) => {
        MySwal.fire({
            title: '¿Seguro de querer borrar el invitado?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Borrar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {
            dispatch(resetStateLoading('loadingStateDeleteGuest'))
            if (result.isConfirmed) {
                await api.delete('/guest', { data: { numberPhone } })
                dispatch(updatedState('loadingStateDeleteGuest'))
            } else if (result.isDenied) {

            }
        })
    }

    const handleSearchGuest = (event) => {
        setSearchNameGuest(event.target.value)
        dispatch(fetchGuests(user.email,0,event.target.value,filterByConfirmation))
        dispatch(setPages([...paginate(metaDataGuests.totalGuests, 0).pages]))
    }
    

    const handleFilterByIsConfirmed = (event) => {
        setFilterByConfirmation(event.target.value)
        dispatch(fetchGuests(user.email,0,searchNameGuest,event.target.value))
        dispatch(setPages([...paginate(metaDataGuests.totalGuests, 0).pages]))
    }

    return (
        <div className='shadow h-100'>
             <div className='container my-2'>
                <div className='d-flex flex-column flex-sm-row gap-3 pt-5 px-1'>
                    <h6> <b><i className="bi bi-people-fill text-primary"></i> Total de invitados: </b>{infoCountGuests?.totalSumGuest?.toLocaleString('en-US')}</h6>
                    <h6> <b><i className="bi bi-person-fill-check text-primary"></i> Confirmados: </b>{ infoCountGuests?.totalIsConfirmed?.toLocaleString('en-US') }</h6>
                    <h6> <b><i className="bi bi-person-fill-exclamation text-primary"></i> No confirmado: </b> { infoCountGuests?.totalIsNotConfirmed?.toLocaleString('en-US') }</h6>
                </div>
                <div className='row mt-4'>
                    <div className='col-12 col-sm-6'>
                        <select className=" form-select mb-3" onChange={handleFilterByIsConfirmed} aria-label="Default select example">
                            <option value="">Todos</option>
                            <option value="true">Confirmado</option>
                            <option value="false">No Confirmado</option>
                        </select>
                    </div>
                    <div className='col-12 col-sm-6'>
                        <div className="input-group mb-3 ">
                            <input onChange={ handleSearchGuest } type="text" className="form-control" placeholder="Ingresa tu busqueda por nombre" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn btn-primary" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive col-12 pb-5">
                {
                    !loadingGuest
                        ? (<NotFound>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </NotFound>)
                        : loadingGuest && !guests.length
                            ? (
                                <NotFound />
                            )
                            : <table className="table table-striped table-sm caption-top align-middle">
                                <caption>Lista de Invitados</caption>
                                <thead className='table-dark'>
                                    <tr className='tableTitles'>
                                        <th scope="col">Nombre</th>
                                        <th style={{ width: '10%' }} scope="col" className='text-center'>Cupos</th>
                                        <th scope="col">No Whatsapp</th>
                                        <th scope="col">Slug</th>
                                        <th scope="col">Estado</th>
                                        <th className='text-center' scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {guests.map(e => {
                                        return (
                                            <tr key={e.id} className='table-light'>
                                                <td>{e.name}</td>
                                                <td style={{ width: '10%' }} className='text-center'>{e.numberGuest}</td>
                                                <td>{e.numberPhone}</td>
                                                <td><a href={e.slug} target="_blank" rel="noopener noreferrer">{e.slug} <i className="bi bi-box-arrow-up-right"></i></a></td>
                                                <td>{!e.isConfirmed ? (<span className="badge text-bg-warning">No cofirmado</span>) : (<span className="badge text-bg-success">Confirmado</span>)}</td>
                                                <td className='text-center'>
                                                    <div className='d-flex gap-1 text-center justify-content-center'>
                                                        <span onClick={() => handleClickGuest(e)} type="button" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top"
                                                            data-bs-custom-class="custom-tooltip"
                                                            data-bs-title="Editar Invitado">

                                                            <i className="bi bi-pencil-square"></i>
                                                        </span>
                                                        <span onClick={() => sendWhatsapp(e.slug, e.numberPhone, e.messageCustomize)} type="button" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top"
                                                            data-bs-custom-class="custom-tooltip"
                                                            data-bs-title="Enviar mensaje de whathsapp">
                                                            <i className="bi bi-whatsapp"></i>
                                                        </span>
                                                        <span onClick={() => handleDelete(e.numberPhone)} type="button" className="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top"
                                                            data-bs-custom-class="custom-tooltip"
                                                            data-bs-title="Borrar Invitado">
                                                            <i className="bi bi-trash"></i>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                }

                <ModalFormEdit />
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={ `page-item ${ metaDataGuests.previous || 'disabled'}` }>
                        <a className="page-link" onClick={ () => dispatch(fetchGuests(user.email, metaDataGuests.previous - 1, searchNameGuest, filterByConfirmation))}><i className="bi bi-chevron-left"></i></a>
                    </li>
                    {
                        pages?.map(page => (
                            <li className={`page-item ${ metaDataGuests.page === page && 'active'}`}><a onClick={ () => dispatch(fetchGuests(user.email, page - 1, searchNameGuest, filterByConfirmation))} className="page-link" >{page}</a></li>
                        ))
                    }
                    
                    <li className={ `page-item ${ metaDataGuests.next || 'disabled'}` }>
                        <a className="page-link" onClick={ () => dispatch(fetchGuests(user.email, metaDataGuests.next - 1, searchNameGuest, filterByConfirmation))}><i className="bi bi-chevron-right"></i></a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default TableGuest