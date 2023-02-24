import { signOut } from "firebase/auth";
import {auth} from '../configAuth/authFirebase'


const LogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('Auth Token')
    }).catch((error) => {
      // An error happened.
    });
}

export default LogOut