import React,{useState} from 'react'

const useUser = () => {

    const [user,setUser] = useState({
        user:JSON.parse(localStorage.getItem('user')),
        authToken: localStorage.getItem('Auth Token')
    })

  return user
}

export default useUser