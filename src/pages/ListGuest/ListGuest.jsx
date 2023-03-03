import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListGuest } from '@/redux/Slices/guestSlice'
import useUser from '@/hooks/useUser'

const ListGuest = () => {
    const dispatch = useDispatch()
    const listGuests = useSelector( state => state.guests.listGuests)
    const {user} = useUser()
    useEffect(()=>{
        dispatch(fetchListGuest(user.email))
    },[])

    console.log(listGuests)

    return (
        <div className='container'>
            <div className='row gap-4'>
                {
                    listGuests.map( guest => {
                        return (
                                <div className="card px-0" style={{width:'30rem'}}>
                                    <div className="card-header text-center fw-bold">
                                        {guest.name}
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        {
                                            guest.Accompanists.map( accompanist => {
                                                return (
                                                    <li className="list-group-item">{accompanist.name}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListGuest