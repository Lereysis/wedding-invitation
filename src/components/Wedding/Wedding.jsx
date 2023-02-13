import React from 'react'
import { useParams } from 'react-router-dom';
import db from '../../db/db';
const Wedding = () => {
    const { slug } = useParams()
    const {nameGuest,numberGuest} = db.find( guest => guest.slugGuest === slug)
    return (
        <div>
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