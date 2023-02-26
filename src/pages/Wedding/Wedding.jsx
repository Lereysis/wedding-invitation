import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '@/services/api/api'
import { updatedState } from '@/redux/Slices/guestSlice';
import bannerBackground1 from '../../assets/img/banner-background1.png'
import imageCouple from '../../assets/img/image-couple.png'
import './Wedding.scss'

const ThankYou = ({name}) => {
    return (
        <p>
            ¡Hola {name}! 🤗
            Muchas gracias por confirmar su asistencia a nuestra boda, ¡significa mucho para nosotros tenerlos presentes en nuestro día especial!

            Estamos emocionados de compartir este momento con ustedes y esperamos que disfruten de la celebración tanto como nosotros.

            No podemos esperar a verlos pronto y compartir juntos este día inolvidable. ¡Gracias de nuevo por su apoyo y amor!

            ¡Nos vemos pronto! 🎉
        </p>
    )
}


const Wedding = () => {
    const { slug } = useParams()
    const [guest, setGuest] = useState({})
    const dispatch = useDispatch()
    const loadingStateConfirmed = useSelector(state => state.guests.loadingStateConfirmed)

    useEffect(() => {
        (async () => {
            const response = await api.get(`/guest-invitation/${slug}`)
            setGuest(response.data.body)
        })()
    }, [loadingStateConfirmed])
    const handleConfirmation = async (numberPhone) => {
        const response = await api.post(`/confirmed`, { numberPhone })
        dispatch(updatedState('loadingStateConfirmed'))
    }
    return (
        <div className='container-wedding text-center'>
            <section className='container-hero'>
                <img className='img-fluid' src={bannerBackground1} />
                <div className='position-relative'>
                    <img className='img-fluid' src={imageCouple} alt=""/>
                </div>
            </section>
            <section className='container-about'>
                <div>
                    <p>Con nuestro amor, la bendicion de Dios y el apoyo de nuestros padres</p>
                    <h4 className='fw-bolder'>Nosotros</h4>
                </div>
                <div className='container'>
                    <h3 className='text-start special-letter mb-0'>Carlos</h3>
                    <h3 className='text-center special-letter mb-0'>&</h3>
                    <h3 className='text-end special-letter mb-0'>Lereyis</h3>
                </div>
                <p className='mt-5'>Tenemos el honor de invitarte a nuestra boda</p>
            </section>
            <section className='container-date'>
                <div>
                    <div>
                        <h5>SEPTIEMBRE</h5>
                        <div className="d-flex align-items-center justify-content-center gap-4 date mx-3">
                            <span>
                                SABADO
                            </span>
                            <h2 className='m-0'>
                                16
                            </h2>
                            <span>
                                2023
                            </span>
                        </div>
                        <span>5:30 PM</span>
                        <p>CEREMONIA Y RECEPCION</p>
                        <p>SALON ORQUIDEAS</p>
                        <p>av. Centro Monteria</p>
                        <button className='btn btn-primary'> Ver ubicacion </button>
                    </div>
                </div>
            </section>
            <section className='container-timeline'>

            </section>
            <section className='container-reservation'>
                <div className='bullets'>
                    <div className='container-dot-number'>
                        <span className='dot'>

                        </span>
                        <span className='number'>
                            1
                        </span>
                    </div>
                    <div className='container-dot-number'>
                        <span className='dot'>

                        </span>
                        <span className='number'>
                            2
                        </span>
                    </div>
                    <div className='container-dot-number'>
                        <span className='dot'>

                        </span>
                        <span className='number'>
                            3
                        </span>
                    </div>
                    <div className='container-dot-number'>
                        <span className='dot active'>

                        </span>
                        <span className='number'>
                            4
                        </span>
                    </div>
                    <div className='container-dot-number'>
                        <span className='dot'>

                        </span>
                        <span className='number'>
                            5
                        </span>
                    </div>
                </div>
            </section>
            <section className='container-gifts'>
                <h3>Sugerencia de regalo</h3>
                <p>
                    Agradecemos tu presencia, pero si
                    deseas tener un detalle con nosotros
                    te damos esta opcion:
                </p>
            </section>
            <section className='container-confirmation'>
                <h3>Confirmacion</h3>
                <p>
                AGRADECEMOS QUE CONFIRMES TU ASISTENCIA haciendo click en este boton si no puede hacer caso omiso a este boton
                </p>
                {
                    guest.isConfirmed ? (<ThankYou name={guest.name}/>) : (<button onClick={() => handleConfirmation(guest.numberPhone)} className='btn btn-primary'>Confirmar asistencia</button>)
                }
            </section>
            <section className='container-footer'>

            </section>
        </div>
    )
}

export default Wedding