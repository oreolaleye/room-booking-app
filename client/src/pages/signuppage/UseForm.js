import {useState} from 'react';

const UseForm = (submit,validate) =>{
    const [values, setValues] =useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        address: "",
        address2: "",
        city: "",
        province: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({});

    const handleChange = e =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();

        setErrors(validate(values));

        const user = values;
        submit(user);

        setValues({fname: "",
        lname: "",
        email: "",
        phone: "",
        address: "",
        address2: "",
        city: "",
        province: "",
        password: "",
        confirmPassword: ""});
    }
 
    return {handleChange, values, handleSubmit, errors}
}

export default UseForm;