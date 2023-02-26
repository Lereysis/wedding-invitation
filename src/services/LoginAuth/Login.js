import { signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { auth } from "../configAuth/authFirebase";
const login = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem('Auth Token',token)
        localStorage.setItem('user', JSON.stringify({
            name: result.user.displayName,
            email:result.user.email,
            imgUrl: result.user.photoURL
        }))
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export default login