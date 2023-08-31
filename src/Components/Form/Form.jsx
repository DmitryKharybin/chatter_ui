
/**
 * Render a form that receive validation schema(yup), submit handler , inputs from the user 
 * 
 * @param {yup.object} schema - Yup schema for input validation, will decide how input will be validated
 * @param {string} submitHandler - Method for form submission
 * @param {[{name, placeHolder, type, id, options?}]} inputs - Array of input attributes , these will be used to construct inputs
 * options is up to the user , it depends if the input is of type select
 */





import { useForm } from "react-hook-form";
import Input from "./Input";
import { yupResolver } from '@hookform/resolvers/yup';



export default function Form({ schema, submitHandler, inputs }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });



    const onSubmit = (data) => {
        submitHandler(data)
    }

    //Protect the component from incorrect inputs (not an array)
    if (!Array.isArray(inputs)) {
        return <h2>Something went wrong...</h2>
    }
    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            {inputs.map(input => {
                return <div key={input.id}>
                    <Input register={register}
                        inputName={input.name}
                        inputPlaceHolder={input.placeHolder}
                        inputType={input.type}
                        inputId={input.id} 
                        options={input.options}/>
                    <p>{errors[input.name]?.message}</p>
                </div>
            })}

            <button>Submit</button>

        </form>


    )

}