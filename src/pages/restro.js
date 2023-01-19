import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {auth,db} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useState} from 'react'
import {addDoc, collection} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom';
import { async } from '@firebase/util';

export const Dish = () =>{
    const [user, loading, error] = useAuthState(auth);
    const navigate=useNavigate();
    const postref = collection(db, "food");
    const [foodtype, setFoodtype] = useState("");
    const [servetime, setServetime] = useState([]);
 
    const {register,handleSubmit, formState:{errors}} = useForm([]);


    const onCreatePost = async ({dishname, description, price}) => {
        console.log(dishname)
        console.log(description)
        console.log(price)
        console.log(foodtype)
        console.log(servetime)
        await addDoc(postref, {
            dishname,description,price,foodtype,servetime,
            useremail: user?.email,
            userId: user?.uid,
        })
        navigate('/');
    }
        

    return <form onSubmit={handleSubmit(onCreatePost)}>
        
        Dish-Name: <input placeholder="Dish Name" {...register('dishname')}/><br />

        Description of the Dish: <input placeholder="Description" {...register('description')}/><br />

        Price: <input placeholder="Price" {...register('price')}/><br />

        Dish-Type:<br />
        <input type="radio" id="veg" name="dish-type" value="VEG" onChange={(e) => {setFoodtype(e.target.value)}}/>
        <label for="veg">VEG</label><br />
        <input type="radio" id="non-veg" name="dish-type" value="NON-VEG" onChange={(e) => {setFoodtype(e.target.value)}}/>
        <label for="non-veg">NON-VEG</label><br />

        Dish Serve-Time:<br />
        <input type="checkbox" id="breakfast" name="breakfast" value="Breakfast" onChange={(e) => {servetime?setServetime([...servetime , e.target.value]):setServetime([e.target.value])}}/>
        <label for="breakfast"> Breakfast</label><br />
        <input type="checkbox" id="lunch" name="lunch" value="Lunch" onChange={(e) => {servetime?setServetime([...servetime , e.target.value]):setServetime([e.target.value])}}/>
        <label for="lunch"> Lunch</label><br />
        <input type="checkbox" id="dinner" name="dinner" value="Dinner" onChange={(e) => {servetime?setServetime([...servetime , e.target.value]):setServetime([e.target.value])}}/>
        <label for="dinner"> Dinner</label><br></br>
        <input type="submit" />
    </form>
}
