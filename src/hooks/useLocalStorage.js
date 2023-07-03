import { useEffect, useState } from "react";
import { isToken } from "typescript";

//Helper function for retrieval of data from localStorage
function getSavedValue(key, initialValue) {

    const savedValue = localStorage.getItem(key)

    // if(savedValue == null){
    //     return savedValue;
    // }

    //If item is token , return it without parsing it , it will simply fail parsing 
    if( isToken(savedValue)){
        return savedValue;
    }

    if (savedValue) return JSON.parse(savedValue)

    if (initialValue instanceof Function) return initialValue()

    return initialValue
}



export default function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])


    return [value, setValue]


}