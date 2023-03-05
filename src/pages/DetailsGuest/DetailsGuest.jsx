import React, { useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import api from '@/services/api/api'
import sendWhatsapp from '@/services/MessagesWhatsapp/sendInvitation'
import sendWhatsappReminder from '@/services/MessagesWhatsapp/sendReminder'
import { fetchDetailsGuest,resetStateLoading, updatedState, setSelectedAccompanist} from '@/redux/Slices/guestSlice';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import useUser from '@/hooks/useUser';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import validate from '@/helpers/validate';
import ModalFormEdit from './components/ModalFormEdit';

const DetailsGuest = () => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const guest = useSelector(state => state.guests.detailsGuest)
  const loadingStateAddGuest = useSelector(state => state.guests.loadingStateAddGuest)
  const loadingStateDeleteGuest = useSelector(state => state.guests.loadingStateDeleteGuest)
  const loadingStateChangeState = useSelector(state => state.guests.loadingStateChangeState)
  const loadingStateConfirmed = useSelector(state => state.guests.loadingStateConfirmed)
  const {id,name} = useParams()
  const {user} = useUser()
  const [infoGuest,setInfoGuest] = useState({}) 
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    setInfoGuest({...guest})
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    dispatch(fetchDetailsGuest(user.email,id,name))

    return () => {
      dispatch(resetStateLoading('loadingStateConfirmed'))
    }

  }, [dispatch,id,name,guest.name,loadingStateAddGuest,loadingStateDeleteGuest,loadingStateChangeState,loadingStateConfirmed])
  
  const handleConfirmation = async (numberPhone,id,responseGuest) => {
    const response = await api.post(`/confirmed`, { numberPhone,id,responseGuest})
    dispatch(updatedState('loadingStateConfirmed'))
  }

  const handleClickAccompanist = (accompanist) => {
    const myModal = new bootstrap.Modal(document.getElementById('modalEditGuest'))
      const myModalEl = document.getElementById('modalEditGuest')
      myModal.show(myModalEl)
      myModalEl.addEventListener('shown.bs.modal', () => {
          dispatch(setSelectedAccompanist(accompanist))
      })
  }

  const handleDelete = async (accompanist) => {
    console.log(accompanist)
      MySwal.fire({
          title: '¿Seguro de querer borrar el invitado?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Borrar',
          denyButtonText: `Cancelar`,
      }).then(async (result) => {
          dispatch(resetStateLoading('loadingStateDeleteGuest'))
          if (result.isConfirmed) {
              await api.delete('/accompanist',{ data: {...accompanist}})
              dispatch(updatedState('loadingStateDeleteGuest'))
          } else if (result.isDenied) {

          }
      })
  }

  const handleChange = (event) => {
    setInfoGuest({
        ...infoGuest,
        [event.target.name] : event.target.value
    })
    setErrors(validate({                 
        ...infoGuest,                        
        [event.target.name] : event.target.value
    }))
  }

  const handleClick = async () => {
    dispatch(resetStateLoading('loadingStateAddGuest'))

    if(errors.name || errors.numberPhone || errors.numberGuest){

        MySwal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Tienes un error en los campos!',
        })
        return
    }

    if(!infoGuest.name.length || !infoGuest.numberPhone.length || !infoGuest.numberGuest.length || !infoGuest.messageCustomize.length){
        MySwal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Todos los campos son obligatorios!',
        })
        return
    }


    try {
      dispatch(resetStateLoading('loadingStateChangeState'))   
      await api.put('/guest',{oldGuest:{
        name:guest.name,
        messageCustomize: guest.messageCustomize,
        numberPhone: guest.numberPhone,
        numberGuest: guest.numberGuest,
        id: guest.id
      },newGuest:{      
        name:infoGuest.name,
        messageCustomize: infoGuest.messageCustomize,
        numberPhone: infoGuest.numberPhone,
        numberGuest: infoGuest.numberGuest,
        id: infoGuest.id
        },
          email:user.email
        },
      )
      dispatch(updatedState('loadingStateChangeState'))
    } catch (error) {
        console.log(error)
        MySwal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'El numero que intentas ingresar ya existe, si el problema persiste hay errores de servidor, deberas contactarte con soporte.',
        })
        return
    }


    MySwal.fire({
        toast:true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
    })
    navigate(`/detalle-invitacion/${infoGuest.id}/${infoGuest.name}`)
  }

  return (
    <>
      {
        Boolean(guest) && (
          <div className='container '>
            <div className='row gap-3 justify-content-between'>
              <div className='col-12 col-lg-6 shadow h-100 py-5 px-3'>
                <div className='d-flex flex-wrap justify-content-between align-items-center mb-4'>
                  <h3 className='text-uppercase m-0'>
                    Detalles de la invitacion
                  </h3>
                  <div className='d-flex gap-2'>
                    <Link to={`/${guest.id}/${guest.name}/formulario-de-recordatorio`} className='btn btn-secondary' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Ver Formulario">
                      <i className="bi bi-textarea-resize"></i>
                    </Link>
                    <Link to={`/${guest.slug}`} className='btn btn-secondary' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Ver Invitacion">
                      <i className="bi bi-box-arrow-up-right"></i>
                    </Link>
                    {
                     ( guest.isConfirmed === false ) && <button onClick={() => handleConfirmation(guest.numberPhone,guest.id,null)} type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Limpiar estado">
                        <i className="bi bi-stars"></i>
                    </button>
                    }
                    {
                     ( guest.isConfirmed && guest.isConfirmed !== null) && <button onClick={() => sendWhatsappReminder(guest.id, guest.name, guest.numberPhone)} type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Enviar mensaje de Recordatorio">
                        <i className="bi bi-megaphone"></i>
                    </button>
                    }
                    {
                      (guest.isConfirmed !== false && guest.isConfirmed === null) && <button onClick={() => sendWhatsapp(guest.slug, guest.numberPhone, guest.messageCustomize)} type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Enviar mensaje de whathsapp">
                        <i className="bi bi-whatsapp"></i>
                      </button>
                    }
                  </div>
                </div>
                <div className='d-flex align-items-center gap-1 mb-4'>
                  <h5 className='fw-bold m-0'>{guest.name}</h5>
                  {guest.isConfirmed === null ? (<small className='text-warning'>(No Confirmado)</small>) : !guest.isConfirmed ? (<small className='text-danger'>(Rechazado)</small>) : (<small className='text-success'>(Confirmado)</small>)}
                </div>
                <h4 className='mb-4'>Nombre de los acompañantes</h4>
                <div className='table-responsive'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Identificador</th>
                        <th scope="col">Edad</th>
                        <th scope="col" className='text-center'>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        guest?.Accompanists?.map( accompanist => {
                            return (
                              <React.Fragment key={accompanist.id}>
                                <tr>
                                    <td>{accompanist.name}</td>
                                    <td>{accompanist.identifier}</td>
                                    <td>{accompanist.age}</td>
                                    <td>
                                      <div className='d-flex gap-1 text-center justify-content-center'>
                                        <span  onClick={() => handleClickAccompanist(accompanist)} type="button" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Editar Invitado">
                                          <i className="bi bi-pencil-square"></i>
                                        </span>
                                        <span onClick={()=> handleDelete(accompanist)} type="button" className="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Editar Invitado">
                                          <i className="bi bi-trash"></i>
                                        </span>
                                      </div>
                                    </td>
                                </tr>
                              </React.Fragment>
                            )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='col-12 col-lg-5 shadow py-5'>
                <form >
                  <div className="mb-3">
                    <label htmlFor="name-guest" className="col-form-label">Nombre de el invitado:</label>
                    <input onChange={handleChange} type="text" className="form-control" id="name-guest" value={infoGuest.name} name="name" />
                    {errors.name && (<p className='text-danger'>{errors.name}</p>)}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="number-guest" className="col-form-label">Numero de invitados:</label>
                    <input onChange={handleChange} type="text" className="form-control" id="number-guest" value={infoGuest.numberGuest} name="numberGuest" />
                    {errors.numberGuest && (<p className='text-danger'>{errors.numberGuest}</p>)}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="number-phone" className="col-form-label">Numero de Telefono:</label>
                    <input onChange={handleChange} type="text" className="form-control" id="number-phone" value={infoGuest.numberPhone} name="numberPhone" />
                    {errors.numberPhone && (<p className='text-danger' >{errors.numberPhone}</p>)}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Mensaje perzonalizado de invitacion</label>
                    <textarea onChange={handleChange} className='form-control' id="message" name="messageCustomize" rows="8"  value={infoGuest.messageCustomize}></textarea>
                  </div>
                </form>
                <button onClick={() => handleClick()} type="submit" className="btn btn-primary w-100">Guardar</button>
              </div>
            </div>
            <ModalFormEdit/>
          </div>
        )
      }
    </>
  )
}

export default DetailsGuest