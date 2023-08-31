//Detect click outside of component, it has a ref that reference the window
//Check if ref contains the target (element it is originally referenced), if now , that means tha 
//The mouse has clicked somewhere else on the screen



import { useRef, useState } from "react";
import { useEffect } from "react";

export default function useOutsideAlert(initialState) {

    const ref = useRef(null);
    const [outSideDetect, setoutSideDetect] = useState(initialState)

    useEffect(() => {
        document.addEventListener('click', handleClick, true)
        return () => {
            document.removeEventListener('click', handleClick, false)
        }
    }, [ref])




    function handleClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setoutSideDetect(true)
        }
    }


    return [outSideDetect, setoutSideDetect, ref]


}