import HorizontalContainer from "../HorizontalContainer";

export default function ExistingMessangerBox({ name, image }) {


    return (
        <div>
            <HorizontalContainer>
                <img className="small-round-image" src={'data:image/png;base64, ' + image} />
                <h3>{name}</h3>
            </HorizontalContainer>
        </div>
    )
}