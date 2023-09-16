import '../App.css'

export default function HorizontalContainer(props){

   
        return (
            <div className='horizontal-flex' style={{justifyContent: props.xAxis, gap: props.gapDist, alignItems: props.yAxis}} >
                {props.children}
            </div>
        )
   
}