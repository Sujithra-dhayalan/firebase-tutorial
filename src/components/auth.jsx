import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react'

function Auth() {

    const [email, setEmail] = useState("") //for the email
    const [password, setPassword] = useState("") //for the password

    //this function is for logging in through email id and password
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        }

    }
    console.log(auth?.currentUser?.email)

    //this function is for logging in through google
    const singInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }

    //this function is for logout
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button>
            <button onClick={singInWithGoogle}>Sign In with Google</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Auth