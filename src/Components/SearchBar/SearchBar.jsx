import { CSSTransition } from 'react-transition-group'
import ResultMenu from '../ResultMenu'
import './SearchBar.css'
import { useRef, useState } from 'react'
import useOutsideAlert from '../../hooks/useOutsideAlerter'
import useDebounce from '../../hooks/useDebounce'

export default function SearchBar() {


    //Detect click outside of the component , if detected , close the drop down menu, if not open it 
    const [outSideDetect, setoutSideDetect, ref] = useOutsideAlert(true)
    const [input, setInput] = useState('')



    const nodeRef = useRef(null);

    const debouncedInput = useDebounce(input, 500)


    return (

        <div style={{ position: 'relative' }}>
            <input value={input} className='search_bar'
                placeholder='Search Chatter'
                onClick={() => setoutSideDetect(false)}
                onChange={(e) => setInput(e.target.value)} />
            <CSSTransition
                in={outSideDetect == false}
                nodeRef={nodeRef}
                timeout={300}
                classNames="drop-effect"
                onExit={() => setInput('')}
                unmountOnExit

            >
                <div className="res_menu" ref={nodeRef}>
                    <div ref={ref}>
                        <ResultMenu input={debouncedInput.debouncedValue}></ResultMenu>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )

}