import { useState } from "react";
import { useRef } from "react";
import useDebounce from "../../hooks/useDebounce";

export default function MessengerSearchBar(props) {

    const [input, setInput] = useState('')
    const nodeRef = useRef(null);

    const debouncedInput = useDebounce(input, 500)


    return (
        <div style={{ position: 'relative' }}>
            <input
                placeholder='Search Messenger' id={'messenger-search-bar'}
            />
        </div>


    )
}