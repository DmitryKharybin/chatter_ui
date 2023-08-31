import '../App.css'

export default function HorizontalContainer(props){



    return (
        <div className='horizontal-flex'>
            {props.children}
        </div>
    )
}