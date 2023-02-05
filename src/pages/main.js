import {auth,db} from '../config/firebase';
import {getDocs, collection} from 'firebase/firestore';
import {useEffect, useState} from "react"

export const Main = () => {
    const foodRef = collection(db, "food");
    const [foodList, setFoodList] = useState(null);

    const getFoodList = async () => {
        const result = await getDocs(foodRef);
        setFoodList(result.docs.map((doc)=> ({...doc.data()})) );
    };

    useEffect(()=> {
        getFoodList();
    },[]);

    return <div>
        <p>Main Page</p>
        {foodList?.map((food) =>  {return ( <div><p>{food.dishname},
        {food.description}, 
        {food.price}, 
        {food.foodtype}, 
        {food.servetime},
        </p>
        <img src={food.imgURL} alt="image not found" />
        </div>)}
        
        )}
        <p>Over</p>
    </div>
}