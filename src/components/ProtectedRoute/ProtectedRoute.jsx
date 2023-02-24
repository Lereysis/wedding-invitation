import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/services/configAuth/authFirebase'


const ProtectedRoute = ({children}) => {

  const[flag,setFlag] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFlag(true)
      } else {
        navigate('/')
      }
    });
  })

  return (
    <>{flag && children}</>
  )
}

export default ProtectedRoute