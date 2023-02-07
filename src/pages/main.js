import {auth,db} from '../config/firebase';
import {getDocs, collection} from 'firebase/firestore';
import {useEffect, useState} from "react"
import "../CSS/main.css"

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

    return <div className='grid-container'>
        {foodList?.map((food) =>  {return ( 
                <div className='cards'>
                    <div className='front'>
                        <p>{food.dishname}</p>
                        <img className='image' src={food.imgURL} alt="image not found" />
                        <p>{food.price}</p>
                    </div>
                    <div className='back'>
                        {food.description}, 
                        {food.foodtype}, 
                        {food.servetime},
                    </div>
                </div>
                )
            }
        
        )}
    </div>
}