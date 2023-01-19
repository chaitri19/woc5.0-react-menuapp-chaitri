import {useState} from "react";
import "../App.css"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from '../config/firebase'
import { useNavigate } from 'react-router-dom'

export const Register = () => {

    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const register_user = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
            console.log(user)
            navigate('/add-dish')
        } catch (err) {
            alert(err.message);
        }
    };

    return <div>
        <p>Register</p>
        Email: <input placeholder="email" onChange={(event) => setRegisterEmail(event.target.value)}/>
        <br></br>
        Password:<input placeholder="password" onChange={(event) => setRegisterPassword(event.target.value)}/>
        <br></br>
        <button onClick={register_user}>Click to SignIn</button>
    </div>
}