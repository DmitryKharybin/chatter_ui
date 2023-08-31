
/**
 * Debounce the input it receive , if not disrupted , it will return the input back after x amount of time
 * If new input is received before timeout ended , it will be cleared and new time will be set , delaying the return further.
 * 
 * @param {any} value - A value that will be delayed via setTimeout
 * @param {number} delay - The delay in milliseconds for the setTimeout 
 * @param {any} debouncedValue - The debounced value 
 */

import { useState, useEffect } from "react"


export default function useDebounce(value, delay) {


    const [debouncedValue, setDebouncedValue] = useState('');


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return() =>{
            clearTimeout(handler);
        }

    }, [value, delay])


    return {debouncedValue, setDebouncedValue}


}
