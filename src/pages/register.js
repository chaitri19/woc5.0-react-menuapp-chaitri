import {useState} from "react";
import "../App.css"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import '../CSS/Login.css'

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

    return <div className="box">
        <div className="login">
            <p>Register Here</p>
            Email: <input placeholder="email" onChange={(event) => setRegisterEmail(event.target.value)}/>
            <br></br>
            Password:<input placeholder="password" onChange={(event) => setRegisterPassword(event.target.value)}/>
            <br></br>
            <button onClick={register_user}>Click to SignIn</button>
        </div>
    </div>
}