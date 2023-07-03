//This is a dynamic Input component, the user has full control over every html5 validator 
//If validator is not provided by user , it will not effect the input , due to it's default
//Value being 'undefined'


export default function Input({ inputPlaceHolder, inputType, inputName, inputId, register }) {

    return (
        <>
            <input {...register(inputName)} type={inputType}
         name={inputName}
         id={inputId}
         placeholder={inputPlaceHolder}
         ></input>
        
          
        </>


    )
}