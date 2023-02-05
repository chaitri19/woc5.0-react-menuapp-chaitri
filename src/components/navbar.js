import {useNavigate ,Link, createSearchParams} from 'react-router-dom';
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'
import {useEffect, useState} from 'react'
import '../CSS/Navbar.css';
import {FoodTimeList1} from './filters'
import { set } from 'react-hook-form';

export const Navbar = () =>{

    const navigate=useNavigate();
    const LogOut = async () => {

        const result= await signOut(auth);
        navigate('/');
    }
    const [user, loading, error] = useAuthState(auth);
    const [show,setShow]=useState(false);
    const [showDropdown, setShowDropdown]=useState(false);
    const [checkedFood, setCheckedFood] = useState(['Breakfast','Lunch','Dinner']);
    const [checkboxVal, setCheckboxVal] = useState([false,false,false])
    const [checkAll, setCheckAll] = useState(false);

    const handleVEG = () => {
        navigate('/filter/1');
        setShow(false)
    };

    const handleNONVEG = () => {
        navigate('/filter/2');
        setShow(false)
    };

    const handleChecked = (e) => {
        const {value, checked}=e.target
        if(checked)
        {
            const newval=checkboxVal;
            if(newval[0] && newval[1] && newval[2])
            {
                setCheckedFood(
                    [value]
                )   
            }
            else
            {
                if(value==='Breakfast')
                {
                    newval[0]=true;
                }
                else if(value==='Lunch')
                {
                    newval[1]=true;
                }
                else{
                    newval[2]=true;
                }
                setCheckboxVal(newval);
                setCheckedFood(
                    [...checkedFood,value]
                )
            }
            if(newval[0] && newval[1] && newval[2])
            {
                setCheckAll(true);
            }
            else
            {
                setCheckAll(false);
            }
        }
        else{
            const newval=checkboxVal;
            if(newval[0] && newval[1] && newval[2])
            {
                setCheckAll(false); 
            }
            if(value==='Breakfast')
            {
                newval[0]=false;
            }
            else if(value==='Lunch')
            {
                newval[1]=false;
            }
            else{
                newval[2]=false;
            }
            setCheckboxVal(newval);
            setCheckedFood(
                checkedFood.filter((e) => e !== value)
            ); 
        }
    };

    const handleCheckedAll = (e) => {
        const {value, checked}=e.target
        if(checked)
        {
            setCheckedFood(
                ['Breakfast','Lunch','Dinner']
            )
            setCheckboxVal(
                [true,true,true]
            )
            setCheckAll(true)
        }
        else
        {
            setCheckedFood([])
            setCheckboxVal(
                [false,false,false]
            )
            setCheckAll(false)
        }
    }
    
    useEffect(()=> {
        navigate({
            pathname:'/filter/time',
            search: createSearchParams({
            checkedFilter: checkedFood
            }).toString()
            })},[checkedFood])

    return <div className='navbar'>
        <div className='navbar-link'>
            <Link className='navbar-linktag' to='/' >Home</Link>
            {!user ? (<Link to='/login' className='navbar-linktag' >Login</Link>) : (<Link to='/add-dish' className='navbar-linktag'>Add Your New Dish</Link>)}
            <button className='navbar-linktag' onClick={() => {setShowDropdown(!showDropdown)}}>Filter by Food Timings</button>
            {
                showDropdown ? (
                    <div>
                        <input type="checkbox" id="breakfast" name="breakfast" value="Breakfast" checked={checkboxVal[0]} onClick={handleChecked}/>
                        <label for="breakfast"> Breakfast</label><br />
                        <input type="checkbox" id="lunch" name="lunch" value="Lunch" checked={checkboxVal[1]} onClick={handleChecked}/>
                        <label for="lunch"> Lunch</label><br />
                        <input type="checkbox" id="dinner" name="dinner" value="Dinner" checked={checkboxVal[2]} onClick={handleChecked}/>
                        <label for="dinner"> Dinner</label><br></br>
                        <input type="checkbox" id="all" name="all" value="All" checked={checkAll} onClick={handleCheckedAll}/>
                        <label for="all">All</label><br></br>
                    </div>
                ) : null
            }
            <button className='navbar-linktag' onClick={() => {setShow(!show)}}>Filter by Food Type</button>
            {
                show ? (
                    <div>
                        <button onClick={handleVEG}>VEG</button><br/>
                        <button onClick={handleNONVEG}>NON-VEG</button>
                    </div>
                ) : null
            }
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