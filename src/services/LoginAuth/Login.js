import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../configAuth/authFirebase";
import axios from "axios";
const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
        .then((result) => {
            console.log(result)
            localStorage.setItem('User', JSON.stringify(result.user))
            axios.post('http://localhost:4000/user',{
                name:result.user.displayName,
                email:result.user.email,
                numberPhone:''
            })
            sessionStorage.setItem('Auth Token', result._tokenResponse.refreshToken)
        }).catch((error) => {
            console.log(error)
        });
}

export default login