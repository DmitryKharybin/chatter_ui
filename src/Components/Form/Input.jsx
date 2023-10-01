/**
 * This is a dynamic Input component, the user has full control over validation using yup schema
 * If validator is not provided by user , it will not effect the input , due to it's default
 * 
 * @param {string} inputPlaceHolder - A place holder for the input
 * @param {string} inputType - The type of the input
 * @param {string} inputName - The name for the input
 * @param {string} inputId - The id for the input
 * @param {string} register - React hook form register method
 * @param {[name,value]} options - Array of options , that consist of {name, value},
 *  these will be the options if the input is of type select
 */




export default function Input({ inputPlaceHolder, inputType, inputName, inputId, register, options, inputRef, whenChange }) {


    if (register) {

        if (inputType === 'select' && options) {

            return (
                <>
                    <select {...register(inputName)}
                        name={inputName}
                        id={inputId}
                    >
                        {options.map((option, index) => {
                            return <option key={index} value={option.value}>{option.name}</option>
                        })}

                    </select>


                </>


            )
        }

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

    return (
        <>
            <input type={inputType}
                name={inputName}
                id={inputId}
                placeholder={inputPlaceHolder}
                ref={inputRef ? inputRef : null}
                onChange={whenChange}
            ></input>


        </>


    )

}