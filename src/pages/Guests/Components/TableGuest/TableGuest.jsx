import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGuests, setSelectedGuest, updatedState, resetStateLoading, fetchGoToPage, fetchSearchGuest, fetchFilterByConfirmation } from '@/redux/Slices/guestSlice'
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
    const guests = useSelector(state => state.guests.guests)
    const loadingGuest = useSelector(state => state.guests.loadingStateListGuests)
    const loadingAddGuest = useSelector(state => state.guests.loadingStateAddGuest)
    const loadingStateDeleteGuest = useSelector(state => state.guests.loadingStateDeleteGuest)
    const loadingStateChangeState = useSelector(state => state.guests.loadingStateChangeState)
    const loadingMetaData = useSelector(state => state.guests.loadingMetaData)
    const metaDataGuests = useSelector(state=> state.guests.metaDataGuests)
    const [pages,setPages] = useState([])
    const [searchNameGuest, setSearchNameGuest] = useState('')
    const [filterByConfirmation, setFilterByConfirmation] = useState('')
    
    
    const { user } = useUser()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGuests(user.email))
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, [dispatch, user, loadingGuest, loadingAddGuest, loadingStateDeleteGuest, loadingStateChangeState])

    useEffect( () => {
       setPages([...paginate(metaDataGuests.totalGuests, 0).pages])   
    },[loadingMetaData, loadingGuest, loadingAddGuest, loadingStateDeleteGuest,searchNameGuest])

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

    const handleSearchGuest = () => {
        dispatch(fetchSearchGuest(user.email, searchNameGuest))
        setPages([...paginate(guests.length, 0).pages])   
    }

    const handleChangeName = (event) => {
        if (!event.target.value.length) {
            handleSearchGuest()
            return
        }
        setSearchNameGuest(event.target.value)
    }

    const handleFilterBySearchName = (event) => {
        setFilterByConfirmation(event.target.value)
        console.log(event.target.value)
        dispatch(fetchFilterByConfirmation(user.email, event.target.value))
    }

    return (
        <div className='shadow h-100'>
             <div className='container my-2'>
                <div className='d-flex flex-column flex-sm-row gap-3 pt-5 px-1'>
                    <h6> <b><i className="bi bi-people-fill text-primary"></i> Total de invitados: </b>{guests.length + guests.reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest), 0)}</h6>
                    <h6> <b><i className="bi bi-person-fill-check text-primary"></i> Confirmados:</b> {guests.filter(guest => guest.isConfirmed === true).length + guests.filter(guest => guest.isConfirmed === true).reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest), 0)}</h6>
                    <h6> <b><i className="bi bi-person-fill-exclamation text-primary"></i> No confirmado:</b> {guests.filter(guest => guest.isConfirmed === false).length + guests.filter(guest => guest.isConfirmed === false).reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest), 0)}</h6>
                </div>
                <div className='row mt-4'>
                    <div className='col-12 col-sm-6'>
                        <select className=" form-select mb-3" onChange={handleFilterBySearchName} aria-label="Default select example">
                            <option value="">Todos</option>
                            <option value="true">Confirmado</option>
                            <option value="false">No Confirmado</option>
                        </select>
                    </div>
                    <div className='col-12 col-sm-6'>
                        <div className="input-group mb-3 ">
                            <input onChange={ handleChangeName } type="text" className="form-control" placeholder="Ingresa tu busqueda por nombre" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button onClick={ () => handleSearchGuest()  } className="btn btn-primary" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive col-12  px-3 pb-5">
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
                                            <tr key={e.numberPhone} className='table-light'>
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
                            <a className="page-link" onClick={ () => dispatch(fetchGoToPage(user.email, metaDataGuests.previous - 1))}><i className="bi bi-chevron-left"></i></a>
                        </li>
                        {
                            pages.map(page => (
                               <li className="page-item"><a onClick={ () => dispatch(fetchGoToPage(user.email, page - 1))} className="page-link" >{page}</a></li>
                            ))
                        }
                       
                        <li className={ `page-item ${ metaDataGuests.next || 'disabled'}` }>
                            <a className="page-link" onClick={ () => dispatch(fetchGoToPage(user.email, metaDataGuests.next - 1))}><i className="bi bi-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
        </div>
    )
}

export default TableGuest