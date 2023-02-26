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
            <img className='img-fluid' src={bannerBackground1} />
            <p className='px-3 py-4'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt delectus aliquid amet, vel natus voluptates minima? Velit commodi aut sequi incidunt non fugit quisquam accusamus perferendis? Iusto, blanditiis ullam! Ipsam!
            </p>
            <div className='position-relative'>
                <img className='img-fluid' src={imageCouple} alt="" />
                <div className='pseudo-text'>
                    <h1 className='special-letter'> C | L </h1>
                    <p>nos casamos</p>
                </div>
            </div>
            <h1>
                {guest.name}
            </h1>
            <p>
                Numero de invitados: {guest.numberGuest}
            </p>

            {
                guest.isConfirmed ? (<ThankYou name={guest.name}/>) : (<button onClick={() => handleConfirmation(guest.numberPhone)} className='btn btn-primary'>Confirmar asistencia</button>)
            }
        </div>
    )
}

export default Wedding