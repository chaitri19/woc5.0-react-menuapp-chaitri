import {auth,db} from '../config/firebase';
import {getDocs, collection} from 'firebase/firestore';
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

export const VEG = (currtype) => {
    const foodRef = collection(db, "food");
    const [foodList, setFoodList] = useState(null);

    const getFoodListsorted = async () => {
        const result = await getDocs(foodRef);
        setFoodList(result.docs.map((doc)=> ({...doc.data()})) );
    }

    useEffect(()=> {
        getFoodListsorted();
    },[]);

    return <div>
        <p>{currtype.currtype} Food List is here</p>
        {foodList?.filter((food) => {return food.foodtype === currtype.currtype}).map((food) => {
                return (
                <p>
                    {food.dishname}
                </p>
            )
            }) 
        }
    </div>
};

export const FoodTimeList = () => {
    const [searchparams]=useSearchParams();
    const foodRef = collection(db, "food");
    const [foodList1, setFoodList1] = useState(null);
    const [displayFood, setDisplayFood] = useState(null);
    const timeval = searchparams.getAll("checkedFilter").toString()
    var foodtime = timeval.split(',');

    const getFoodList1 = async () => {
        const result = await getDocs(foodRef);
        setFoodList1(result.docs.map((doc)=> ({...doc.data()})) );
    };
    
    useEffect(()=> {
        getFoodList1();
    },[]);
    
    const sortedtime = foodtime
    .sort(function(a, b) {
    if(a.toLowerCase() < b.toLowerCase()) return -1;
    if(a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
    });

    function checkPresence(a){
        console.log("Inside:")
        console.log(a)
        console.log(sortedtime.includes(a))
        return sortedtime.includes(a)
    }

    let displaylist=null
        if (foodList1 != null)
        {
            const L= foodList1?.filter(food => {return food.servetime.sort(function(a, b) {
                if(a.toLowerCase() < b.toLowerCase()) return -1;
                if(a.toLowerCase() > b.toLowerCase()) return 1;
                return 0;
                })})
                for (const [i, product] of L.entries()) {
                    for (const [j,p] of product.servetime.entries()){
                        if(sortedtime.includes(p))
                        {
                            if(displaylist!==null)
                            {
                                const newlist = displaylist.concat({product})
                                displaylist=newlist
                                //setDisplayFood([...displayFood,product])
                            }
                            else{
                                displaylist=[{product}]
                            }
                            break;
                        }
                    }
                }
        }

    return (
    <div>
        {displaylist?.map((d)=> {return (<p>{d.product.dishname}</p>)})}
    </div>)
};