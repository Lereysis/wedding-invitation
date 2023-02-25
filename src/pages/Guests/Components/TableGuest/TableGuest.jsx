import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGuests, setSelectedGuest, updatedState, resetStateLoading} from '@/redux/Slices/guestSlice'
import api from '@/services/api/api'
import useUser from '@/hooks/useUser'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ModalFormEdit from '@/components/ModalFormEdit/ModalFormEdit'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import './TableGuest.scss'

const TableGuest = () => {
    const MySwal = withReactContent(Swal)
    const guests = useSelector(state => state.guests.guests)
    const loadingGuest = useSelector(state => state.guests.loadingStateListGuests)
    const loadingAddGuest = useSelector(state => state.guests.loadingStateAddGuest)
    const loadingStateDeleteGuest = useSelector(state => state.guests.loadingStateDeleteGuest)
    const loadingStateChangeState = useSelector(state => state.guests.loadingStateChangeState)

    const { user } = useUser()

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchGuests(user.email))
        
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, [dispatch, user, loadingGuest, loadingAddGuest,loadingStateDeleteGuest,loadingStateChangeState])

    const sendWhatsapp = async (url, number, message) => {
        await api.post('/send-message', {
            number,
            url:`${window.location.origin}/${url}`,
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
                console.log(numberPhone)
              await api.delete('/guest',{ data: {numberPhone}})
              dispatch(updatedState('loadingStateDeleteGuest'))
            } else if (result.isDenied) {
              
            }
        })
    }

    return (
        <div className="table-responsive col-12 shadow px-3 py-5">
           
            <div className='d-flex gap-3'>
                <h6> <b><i class="bi bi-people-fill text-primary"></i> Total de invitados: </b>{guests.length + guests.reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest), 0)}</h6>
                <h6> <b><i class="bi bi-person-fill-check text-primary"></i> Confirmados:</b> {guests.filter(guest => guest.isConfirmed === true).length + guests.filter(guest => guest.isConfirmed === true).reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest), 0)}</h6>
                <h6> <b><i class="bi bi-person-fill-exclamation text-primary"></i> No confirmado:</b> {guests.filter(guest => guest.isConfirmed === false).length + guests.filter(guest => guest.isConfirmed === false).reduce((accumulator, currentValue) => accumulator + Number(currentValue.numberGuest), 0)}</h6>
            </div>
            <div className='container row my-2'>
                <select class="col form-select mb-3" aria-label="Default select example">
                    <option selected>Filtrar por nombre A-Z</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <div class="col input-group mb-3 ">
                    <input type="text" class="form-control" placeholder="Ingresa tu busqueda por nombre" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn btn-primary" type="button" id="button-addon2"><i class="bi bi-search"></i></button>
                </div>
            </div>
            <table className="table table-striped table-sm caption-top">
                <thead className='table-dark'>
                    <tr className='tableTitles'>
                        <th scope="col">Nombre de invitado</th>
                        <th style={{ width: '10%' }} scope="col" className='text-center'>Cupos</th>
                        <th scope="col">Nro de Whatsapp</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Confirmación</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !loadingGuest 
                        ? (<h1>Cargando</h1>) 
                        : loadingGuest && !guests.length 
                        ? (<h1>No hay datos</h1>)
                        : guests.map(e => {
                            return (
                                <tr key={e.numberPhone} className='table-light'>
                                    <td>{e.name}</td>
                                    <td style={{ width: '10%' }} className='text-center'>{e.numberGuest}</td>
                                    <td>{e.numberPhone}</td>
                                    <td><a href={e.slug} target="_blank" rel="noopener noreferrer">{e.slug} <i class="bi bi-box-arrow-up-right"></i></a></td>
                                    <td>{!e.isConfirmed ? (<span className="badge text-bg-warning">No cofirmado</span>) : (<span className="badge text-bg-success">Confirmado</span>)}</td>
                                    <td>
                                        <div className='d-flex gap-1'>
                                            <span onClick={()=> handleClickGuest(e)} type="button" class="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title="Editar Invitado">
                                                   
                                                        <i class="bi bi-pencil-square"></i>
                                            </span>
                                            <span onClick={() => sendWhatsapp(e.slug, e.numberPhone, e.messageCustomize)} type="button" class="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title="Enviar mensaje de whathsapp">
                                                <i class="bi bi-whatsapp"></i>
                                            </span>
                                            <span onClick={()=>handleDelete(e.numberPhone)} type="button" class="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title="Borrar Invitado">
                                                <i class="bi bi-trash"></i>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                    <li class="page-item disabled">
                        <a class="page-link"><i class="bi bi-chevron-left"></i></a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
                    </li>
                </ul>
            </nav>
            <ModalFormEdit />
        </div>
    )
}

export default TableGuest