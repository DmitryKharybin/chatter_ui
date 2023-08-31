import "./DropDownMenu.css"


export default function DropDownMenu(props) {


    return (

        <div ref={props.elementRef}>
            {props.children}
        </div>


    )
}