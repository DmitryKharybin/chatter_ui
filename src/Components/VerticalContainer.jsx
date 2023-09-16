import '../App.css'

export default function VerticalContainer(props){

    return(
        <div className='vertical-flex' style={{gap: props.gapDist}}>
            {props.children}
        </div>
    )
}