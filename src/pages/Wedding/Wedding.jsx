import React from 'react'
import { useParams } from 'react-router-dom';
import db from '../../db/db';
import './Wedding.scss'
import bannerBackground1 from '../../assets/img/banner-background1.png'
import imageCouple from '../../assets/img/image-couple.png'

const Wedding = () => {
    const { slug } = useParams()
    const {nameGuest,numberGuest} = db.find( guest => guest.slugGuest === slug)
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
                {nameGuest}
            </h1>
            <p>
                Numero de invitados: {numberGuest}
            </p>
        </div>
    )
}

export default Wedding