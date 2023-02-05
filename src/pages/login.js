import {useState} from "react";
import {auth} from "../config/firebase";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate , Link } from 'react-router-dom';
import '../CSS/Login.css'

export const Login = () => {

    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const User_Login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword);
            console.log(user)
            navigate('/add-dish')
        } catch (err) {
            console.log(err.message);
            alert(err.message)
        }
    }

    return <div className="box">
        <div className="login">
            <p>Login Here</p>
            Email: <input placeholder="email" onChange={(effect) => {setLoginEmail(effect.target.value)}} />
            <br></br>
            Password:<input placeholder="password" onChange={(effect) => {setLoginPassword(effect.target.value)}}/>
            <br></br>
            <button onClick={User_Login} >Click to Login</button>
        </div>
        <div className="register">
            Don't have an account? <Link to="/register">Register</Link> now.
        </div>
        
    </div>
}