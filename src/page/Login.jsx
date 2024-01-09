import "./login.css"
import { Link ,useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import { validateLogin } from "../helpers/form_valid";
import { Toaster ,toast} from "react-hot-toast";
import { userLogin } from "../helpers/request";


function Login() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            username:"",
            password:""
        },
        validate:validateLogin,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async (value)=>{
            let res = userLogin(value);
            toast.promise(res, {
                loading: "loading",
                success: (res) => {
                    navigate("/");
                    localStorage.setItem("token",res.data.token)
                    return res.data.msg;
                },
                error: "Invalid username or password !"
        
            })
        } 
    })
    return (
        <>
        <Toaster/>
            <div className="login-page">
                <div onSubmit={formik.handleSubmit} className="form">
                    <form  className="login-form">
                        <input {...formik.getFieldProps("username")} type="text" name="username" placeholder="username" />
                        <input {...formik.getFieldProps("password")} type="password" name="password" placeholder="password" />
                        <input type="submit" value="Login" />
                        <p className="message">Not registered? <Link className="link" to="/register">Create an account</Link></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;