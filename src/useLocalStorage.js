import { useEffect, useState } from "react";

// useLocalStorage has two functions : gets from local storage a saved object based on a key, and also saves the object
// whenever the state of the object changes
// returns the useState object 

export default function useLocalStorage(key, defaultValue){ // takes in key and defaultValue as parameters 

    const [value,setValue] = useState(()=>{ // value is the state object, and setValue is the function that changes state 
        const jsonValue = localStorage.getItem(key) // jsonValue is the object that is retrieved based on key
        if(defaultValue !== null){
            return JSON.parse(jsonValue)
        }
        if(typeof jsonValue === "function"){
            return jsonValue();
        }
        else{
            return defaultValue // returns defaultValue if nothing is saved in localStorage 
        }
    })

    useEffect( () =>{ // useEffect hook runs everytime the state of value changes 

        localStorage.setItem(key, JSON.stringify(value)) // saves state of value to localStorage 

    }, [value,setValue])

    return [ value, setValue]
}