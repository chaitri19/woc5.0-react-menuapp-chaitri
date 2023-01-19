import {useNavigate ,Link} from 'react-router-dom';
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'
import '../App.css';

export const Navbar = () =>{

    const navigate=useNavigate();
    const LogOut = async () => {

        const result= await signOut(auth);
        navigate('/');
    }
    const [user, loading, error] = useAuthState(auth);

    return <div className='navbar'>
        <div className='navbar-link'>
            <Link to='/' >Home</Link>
            {!user ? (<Link to='/login' >Login</Link>) : (<Link to='/add-dish' >Add Your New Dish</Link>)}
        </div>

        <div className='user'>
            {user && (
                <>
                    <p>{user?.email}</p>
                    <button onClick={LogOut}>Log Out</button>
                </>
            )}
        </div>
    </div>
}