import {NavLink } from "react-router-dom";
import useOutsideAlert from "../../hooks/useOutsideAlerter";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";


export default function NavItem(props) {


    const [outSideDetect, setOutsideDetect, ref] = useOutsideAlert(true)
    const Navref = useRef(null);


    function itemClicked() {
        if (outSideDetect === false) {
            setOutsideDetect(true);
        } else {
            setOutsideDetect(false);
        }

        if (props.specialFunc && typeof props.specialFunc === "function") {
            props.specialFunc();
        }
    }


    return (
        <div ref={ref}>
            {props.action ? <li onClick={props.action}><NavLink to={props.destination} className={({ isActive }) => isActive ? 'active_link' : 'inactive_link'}>{props.icon}</NavLink></li>
                : <li onClick={() => itemClicked()} ><NavLink to={props.destination} className={({ isActive }) => isActive ? 'active_link' : 'inactive_link'}>{props.icon}</NavLink></li>}

            <CSSTransition
             in={outSideDetect == false && typeof props.children !== "undefined"}
             nodeRef={Navref}
             timeout={300}
             classNames="drop-effect"
             unmountOnExit>

                <div className="res_menu" ref={Navref}>
                    {outSideDetect === false && props.children}
                </div>
            </CSSTransition>




        </div>
    )
}