import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '@/services/api/api'
import { updatedState } from '@/redux/Slices/guestSlice';
import bannerBackground1 from '../../assets/img/banner-background1.png'
import imageCouple from '@/assets/card-Invitation/PNG/firts-img.png'
import Logo from '@/assets/card-Invitation/SVG/logo-final.svg'
import './Wedding.scss'
import IconTimeline from '@/assets/card-Invitation/SVG/time.svg'
import IconRings from '@/assets/card-Invitation/SVG/rings.svg'
import IconGlases from '@/assets/card-Invitation/SVG/glases-cheers.svg'
import IconDinner from '@/assets/card-Invitation/SVG/dinner-icon.svg'
import IconDance from '@/assets/card-Invitation/SVG/firts-dance.svg'
import IconHappyHour from '@/assets/card-Invitation/SVG/happy-hour.svg'
import IconGoodBye from '@/assets/card-Invitation/SVG/goodbye.svg'
import IconCards from '@/assets/card-Invitation/SVG/pases-icon.svg'
import IconGift from '@/assets/card-Invitation/SVG/gits-icon.svg'
import IconEnvelop from '@/assets/card-Invitation/SVG/develop.svg'
import IconConfirmation from '@/assets/card-Invitation/SVG/whatsapplove.svg'
import IconClothes from '@/assets/card-Invitation/SVG/chlote.svg'
import BannerFooter from '@/assets/card-Invitation/PNG/imgfinal.png'


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
    const handleConfirmation = async (numberPhone,id,responseGuest) => {
        const response = await api.post(`/confirmed`, { numberPhone,id,responseGuest})
        dispatch(updatedState('loadingStateConfirmed'))
    }
    return (
        <div className='container-wedding text-center mt-5'>
            <section className='container-hero'>
                <img className='img-fluid' src={bannerBackground1} />
                <div className='position-relative'>
                    <img className='img-fluid pt-5' src={imageCouple} alt=""/>
                    <img className='img-fluid logo' src={Logo} alt="Logo Carlos y Lero" />
                    <p className='pseudo-text'>
                        ¡Nos Casamos!
                    </p>
                </div>
            </section>
            <section className='container-about pt-5'>
                <div className='pt-5 mt-5'>
                    <p>Con nuestro amor, la bendicion de Dios y el apoyo de nuestros padres</p>
                    <h3 className='fw-bolder my-5'>Nosotros</h3>
                </div>
                <div className='container'>
                    <h1 className='text-start special-letter mb-0'>Carlos</h1>
                    <h1 className='text-center special-letter mb-0'>&</h1>
                    <h1 className='text-end special-letter mb-0'>Lereyis</h1>
                </div>
                <p className='mt-5'>Tenemos el honor de invitarte a nuestra boda</p>
            </section>
            <section className='container-date mb-5 pb-5'>
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
                        <p className='fw-bolder'>5:30 PM</p>
                        <p className='mb-0'>CEREMONIA Y RECEPCION</p>
                        <p>SALON ORQUIDEAS <br /> av. Centro Monteria</p>
                        <button className='btn btn-wedding'> Ver ubicacion </button>
                    </div>
                </div>
            </section>
            <section className='container-timeline pt-5'>
                <img className='icon img-fluid mb-4' src={IconTimeline} alt="" srcset="" />
                <h3>Itenerario de actividades</h3>
                <div className='items-timeline mt-3'>
                    <div className='d-flex align-items-center pb-3'>
                        <div className='col-6'>
                            <div>
                                <h6>Ceremonia</h6>
                                <span>5:30 PM</span>        
                            </div>
                        </div>
                        <div className='col-6'>
                            <img className='icon img-fluid' src={IconRings} alt="" />
                        </div>

                    </div>
                    <div className='d-flex flex-row-reverse align-items-center pb-3'>
                        <div className='col-6'>
                            <div>
                                <h6>Brindis</h6>
                                <span>5:30 PM</span>        
                            </div>
                        </div>
                        <div className='col-6'>
                            <img className='icon img-fluid' src={IconGlases} alt="" />
                        </div>

                    </div>
                    <div className='d-flex align-items-center pb-3'>
                        <div className='col-6'>
                            <div>
                                <h6>Cena</h6>
                                <span>5:30 PM</span>        
                            </div>
                        </div>
                        <div className='col-6'>
                            <img className='icon img-fluid' src={IconDinner} alt="" />
                        </div>

                    </div>
                    <div className='d-flex flex-row-reverse align-items-center pb-3'>
                        <div className='col-6'>
                            <div>
                                <h6>Primer Baile</h6>
                                <span>5:30 PM</span>        
                            </div>
                        </div>
                        <div className='col-6'>
                            <img className='icon img-fluid' src={IconDance} alt="" />
                        </div>

                    </div>
                    <div className='d-flex align-items-center pb-3'>
                        <div className='col-6'>
                            <div>
                                <h6>Hora Feliz</h6>
                                <span>5:30 PM</span>        
                            </div>
                        </div>
                        <div className='col-6'>
                            <img className='icon img-fluid' src={IconHappyHour} alt="" />
                        </div>

                    </div>
                    <div className='d-flex flex-row-reverse align-items-center pb-3'>
                        <div className='col-6'>
                            <div>
                                <h6>Ceremonia</h6>
                                <span>5:30 PM</span>        
                            </div>
                        </div>
                        <div className='col-6'>
                            <img className='icon img-fluid' src={IconGoodBye} alt="" />
                        </div>

                    </div>
                </div>
            </section>
            <section className='container-reservation mt-5 pt-5'>
                <img className='icon img-fluid mb-4' src={IconCards} alt="" srcset="" />
                <h3 className='mb-1'>
                    pases
                    <br />
                    Hemos Reservedo
                </h3>
                <small>Incluye Adultos y niños</small>
                <div className='bullets mt-4 mb-5'>
                    <div className='container-dot-number'>
                        <span className={`dot ${Number(guest.numberGuest) === 1 && 'active'} `}>

                        </span>
                        <span className='number'>
                            1
                        </span>
                    </div>
                    <div className='container-dot-number'>
                        <span className={`dot ${Number(guest.numberGuest) === 2 && 'active'} `}>

                        </span>
                        <span className='number'>
                            2
                        </span>
                    </div>
                    <div className='container-dot-number'>
                        <span className={`dot ${Number(guest.numberGuest) === 3 && 'active'} `}>

                        </span>
                        <span className='number'>
                            3
                        </span>
                    </div>
                    <div className='container-dot-number'>
                        <span className={`dot ${Number(guest.numberGuest) === 4 && 'active'} `}>

                        </span>
                        <span className='number'>
                            4
                        </span>
                    </div>
                    <div className='container-dot-number'>
                        <span className={`dot ${Number(guest.numberGuest) === 5 && 'active'} `}>

                        </span>
                        <span className='number'>
                            5
                        </span>
                    </div>
                </div>
            </section>
            <section className='container-gifts pb-5 mb-5'>
                <img className='icon img-fluid mb-4' src={IconGift} alt="" srcset="" />
                <h3>Sugerencia de regalo</h3>
                <p>
                    Agradecemos tu presencia, pero si
                    deseas tener un detalle con nosotros
                    te damos esta opcion:
                </p>
                <h3>efectivo</h3>
                <img className='icon img-fluid mb-4' src={IconEnvelop} alt="" srcset="" />
            </section>
            <section className='container-confirmation pb-5'>
                <img className='icon img-fluid mb-4' src={IconConfirmation} alt="" srcset="" />
                <h3>Confirmacion</h3>
                <p>
                AGRADECEMOS QUE CONFIRMES TU ASISTENCIA DANDO CLICK A ESTE BOTON SINO HACER CASO OMISO
                </p>
                {
                    guest.isConfirmed ? (<ThankYou name={guest.name}/>) : (<button onClick={() => handleConfirmation(guest.numberPhone,guest.id,true)} className='btn btn-wedding'>Confirmar asistencia</button>)
                }
                <h3 className='mt-5 mb-4'>Vestimenta Elegante</h3>
                <img className='icon img-fluid mb-4' src={IconClothes} alt="" srcset="" />
            </section>
            <button onClick={() => handleConfirmation(guest.numberPhone,guest.id,false)} className='btn btn-wedding'>rechazar asistencia</button>
            <section className='container-footer mb-5'>
                <p>FAMILIA</p>
                <h1>
                    {guest.name}
                </h1>
                <p>Esperamos contar con tu presencia</p>
                <h1>
                    Muchas Grracias
                </h1>
                <img className='img-fluid' src={BannerFooter} alt=""/>
            </section>
        </div>
    )
}

export default Wedding