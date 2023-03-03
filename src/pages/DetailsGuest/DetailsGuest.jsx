import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { fetchDetailsGuest } from '@/redux/Slices/guestSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useUser from '@/hooks/useUser'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

const DetailsGuest = () => {

  const dispatch = useDispatch()
  const {Guests} = useSelector(state => state.guests.detailsGuest)
  const {id,name} = useParams()
  const {user} = useUser()

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    dispatch(fetchDetailsGuest(user.email,id,name))
  }, [])



  return (
    <>
      {
        Guests?.length && (
          <div className='container '>
            <div className='row gap-3 justify-content-between'>
              <div className='col-12 col-lg-6 shadow h-100 py-5 px-3'>
                <div className='d-flex flex-wrap justify-content-between align-items-center mb-4'>
                  <h3 className='text-uppercase m-0'>
                    Detalles de la invitacion
                  </h3>
                  <div className='d-flex gap-2'>
                    <Link to={`/${Guests[0].slug}`} className='btn btn-secondary' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Ver Invitacion">
                      <i className="bi bi-box-arrow-up-right"></i>
                    </Link>
                    <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Enviar mensaje de Recordatorio">
                      <i className="bi bi-megaphone"></i>
                    </button>
                    <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Enviar mensaje de whathsapp">
                      <i className="bi bi-whatsapp"></i>
                    </button>
                    <span type="button" className="btn btn-danger text-white" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Borrar Invitado">
                          <i className="bi bi-trash"></i>
                    </span>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-1'>
                  <h5 className='fw-bold m-0'>{Guests[0].name}</h5>
                  {Guests[0].isConfirmed === null ? (<small className='text-warning'>(No Confirmado)</small>) : !Guests[0].isConfirmed ? (<small className='text-danger'>(Rechazado)</small>) : (<small className='text-success'>(Confirmado)</small>)}
                </div>
                <div className='d-flex gap-1 flex-column my-4'>
                  <p className='m-0'>Mensaje de invitacion: <span className="badge rounded-pill text-bg-success">Enviado  - <small>12:45PM</small></span></p>
                  <p className='m-0'>Mensaje de Recordatorio: <span className="badge rounded-pill text-bg-warning">Por Enviar</span></p>
                </div>
                <h4 className='mb-4'>Nombre de los acompañantes</h4>
                <div className='table-responsive'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Identificador</th>
                        <th scope="col">Edad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Guests[0].Accompanists.map( accompanist => {
                            return (
                              <React.Fragment key={accompanist.id}>
                                <tr>
                                    <td>{accompanist.name}</td>
                                    <td>{accompanist.identifier}</td>
                                    <td>{accompanist.age}</td>
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
                    <input type="text" className="form-control" id="name-guest"  name="name" />
                    {/* {errors.name && (<p className='text-danger'>{errors.name}</p>)} */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="number-guest" className="col-form-label">Numero de invitados:</label>
                    <input type="text" className="form-control" id="number-guest"  name="numberGuest" />
                    {/* {errors.numberGuest && (<p className='text-danger'>{errors.numberGuest}</p>)} */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="number-phone" className="col-form-label">Numero de Telefono:</label>
                    <input type="text" className="form-control" id="number-phone"  name="numberPhone" />
                    {/* {errors.numberPhone && (<p className='text-danger' >{errors.numberPhone}</p>)} */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Mensaje perzonalizado de invitacion</label>
                    <textarea className='form-control' id="message" name="messageCustomize" rows="8"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Guardar</button>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default DetailsGuest