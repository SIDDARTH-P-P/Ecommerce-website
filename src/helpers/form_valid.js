import toast from "react-hot-toast";

const usernameRegExp = /^[a-zA-Z0-9_]{4,8}$/;
const phoneRegExp = /^[0-9]{10}$/;
const emailRegExp = /^[a-z0-9_\.]+@[a-z0-9\.\-]+[a-z]{2,6}$/
const passwordRegExp = /^[a-zA-Z0-9]{3,}$/;


export function ValidateRegister(value) {
    const error = {}
    if (!usernameRegExp.test(value.username)) {
        error.username = toast.error("Please enter a valid username");
    }
    else if (!phoneRegExp.test(value.phone)) {
        error.phone = toast.error("Please enter a valid phone");
    }
    else if (!emailRegExp.test(value.email)) {
        error.email = toast.error("Please enter a valid email");
    }
    else if (!passwordRegExp.test(value.password)) {
        error.password = toast.error("Please enter a valid password");
    }
    else if (!passwordRegExp.test(value.cpassword)) {
        error.cpassword = toast.error("Password does not match!");
    }
    return error;
}


export function validateLogin(value) {
    const error = {};
    if (!usernameRegExp.test(value.username)) {
        error.username = toast.error("Invalid username")
    }
    else if (!passwordRegExp.test(value.password)) {
        error.password = toast.error("Invalid Password")
    }
    return error;
}

export function Itemvalidation(value){
    
}