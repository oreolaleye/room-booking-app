export default function ValidateInfo(values){
    let errors = {};

    if(!values.fname.trim()){
        errors.fname = "First name is required";
    }

    if(!values.lname.trim()){
        errors.lname = "Last name is required";
    }

    if(!values.email.trim()){
        errors.email = "Email is required";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Email address is invalid";
    }

    if(!values.phone.trim()){
        errors.phone = "Phone number is required";
    }

    if(!values.address.trim()){
        errors.address = "Street address is required";
    }

    if(!values.city.trim()){
        errors.city = "City is required";
    }

    if(!values.province.trim()){
        errors.province = "State / Province is required";
    }

    if(!values.password.trim()){
        errors.password = "Password is required";
    }else if(values.password.length < 6){
        errors.password = "Password needs to be 6 characters or more";
    }

    if(!values.confirmPassword.trim()){
        errors.confirmPassword = "Password is required";
    }else if(values.password !== values.confirmPassword){
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}