import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import db from '../../db/db';
import './Wedding.scss'
import bannerBackground1 from '../../assets/img/banner-background1.png'
import imageCouple from '../../assets/img/image-couple.png'
import api from '@/services/api/api'

const Wedding = () => {
    const { slug } = useParams()
    const [guest,setGuest] = useState({})
    useEffect( () => {
        ( async () => {
          const response = await api.get(`/guest-invitation/${slug}`)
          setGuest(response.data.body)
        })()
    },[])
    const confirmation = async (numberPhone) => {
        const response = await api.post(`/confirmed`,{numberPhone})
    }
    return (
        <div className='container-wedding text-center'>
            <img className='img-fluid'  src={bannerBackground1} />
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
                guest.isConfirmed ? (<p>Asistencia confirmada</p>) : (<button onClick={() => confirmation(guest.numberPhone)} className='btn btn-primary'>Confirmar asistencia</button>)
            }
        </div>
    )
}

export default Wedding