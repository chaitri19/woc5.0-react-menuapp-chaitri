import {useForm} from 'react-hook-form';
import {auth,db,storage} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useState} from 'react'
import {addDoc, collection} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom';
import '../CSS/resto.css'
import { async } from '@firebase/util';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';

export const Dish = () =>{
    const [user, loading, error] = useAuthState(auth);
    const navigate=useNavigate();
    const postref = collection(db, "food");
    const [foodtype, setFoodtype] = useState("");
    const [servetime, setServetime] = useState([]);
    const [imgURL, setImgURL] = useState(null);
    const [progrssPercet, setProgressPercent] = useState(0);
 
    const {register,handleSubmit, formState:{errors}} = useForm([]);


    const onCreatePost = async ({dishname, description, price}) => {
        await addDoc(postref, {
            dishname,description,price,foodtype,servetime,imgURL,
            useremail: user?.email,
            userId: user?.uid,
        })
        navigate('/');
    };

    const handleUpload = (e) => {
        const file=e.target.files[0]

        if(!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",(snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url)=> {
          setImgURL(url);
          console.log(url);})
      }
    );
    }
  

    return <form onSubmit={handleSubmit(onCreatePost)} className='box'>
        
      <div className="Form">
            Dish-Name: <input placeholder="Dish Name" {...register('dishname')}/><br />

            Description of the Dish: <input placeholder="Description" {...register('description')}/><br />

            Price: <input placeholder="Price" {...register('price')}/><br />

            Dish-Type:<br />
            <input type="radio" id="veg" name="dish-type" value="VEG" onChange={(e) => {setFoodtype(e.target.value)}}/>
            <label for="veg">VEG</label><br />
            <input type="radio" id="non-veg" name="dish-type" value="NON-VEG" onChange={(e) => {setFoodtype(e.target.value)}}/>
            <label for="non-veg">NON-VEG</label><br />

            Dish Serve-Time:<br />
            <input class="container" type="checkbox" id="breakfast" name="breakfast" value="Breakfast" onChange={(e) => {servetime?setServetime([...servetime , e.target.value]):setServetime([e.target.value])}}/>
            <label  for="breakfast"> Breakfast</label><br />
            <input class="container" type="checkbox" id="lunch" name="lunch" value="Lunch" onChange={(e) => {servetime?setServetime([...servetime , e.target.value]):setServetime([e.target.value])}}/>
            <label for="lunch"> Lunch</label><br />
            <input class="container" type="checkbox" id="dinner" name="dinner" value="Dinner" onChange={(e) => {servetime?setServetime([...servetime , e.target.value]):setServetime([e.target.value])}}/>
            <label for="dinner"> Dinner</label><br></br>

            Image of your Dish:<br />
            <input type="file" onChange={handleUpload} />
            <br/>
            <input className='submit' type="submit" />
      </div>
    </form>
}
