import '../App.css'

export default function VerticalContainer(props){

    return(
        <div className='vertical-flex'>
            {props.children}
        </div>
    )
}