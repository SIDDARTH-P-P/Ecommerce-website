import "./register.css"
import { useRef } from "react";
import { convertToBase64 } from "../helpers/converter";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { ValidateRegister } from "../helpers/form_valid";
import { UserRegister } from "../helpers/request";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate()
  const imageRef = useRef();
  const imageHandler = (event) => {
    convertToBase64(event.target.files[0])
      .then(base64Image => {
        imageRef.current.src = base64Image;
        formik.setFieldValue("image", base64Image)
      })
      .catch(() => {
        toast.error("Failed to load image!")
      })
  }
  const formik = useFormik({
    initialValues: {
      image: "",
      username: "",
      phone: "",
      email: "",
      type: "buyer",
      password: "",
      cpassword: ""
    },
    validate: ValidateRegister,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      let res = UserRegister(value);
      toast.promise(res, {
        loading: "loading",
        success: (res) => {
          navigate("/login")
          return res.data;
        },
        error: "user already existe"
      })
    }
  })
  return (
    <>
      <Toaster />
      <div className="wrapper">
        <form className="form-signin" onSubmit={formik.handleSubmit}>
          <div className="avatar-container">
            <div className="image">
              <img src="/R.png" alt="avatar" ref={imageRef} />
            </div>
            <label htmlFor="avatar">
              <img src="/edit-icon.png" alt="" />
            </label>
          </div>
          <input onChange={imageHandler} className="file" type="file" name="image" id="avatar" accept="image/*" />
          <input {...formik.getFieldProps("username")} type="text" className="form-control" name="username" placeholder="Username" required="" />
          <input {...formik.getFieldProps("phone")} type="text" className="form-control" name="phone" id="phone" placeholder="phone" />
          <input {...formik.getFieldProps("email")} type="text" className="form-control" name="email" placeholder="Email Address" required="" />
          <select onChange={(event) => formik.setFieldValue("type", event.target.value)} className="form-control" name="type" id="type" placeholder="type" >
            <option value="buyer">buyer</option>
            <option value="seller">seller</option>
          </select>
          <input {...formik.getFieldProps("password")} className="form-control" type="password" name="password" id="password" placeholder="password" />
          <input {...formik.getFieldProps("cpassword")} className="form-control" type="password" name="cpassword" id="cpassword" placeholder="confirm password" />
          <input className="form-control" type="submit" value="register" />
          <p className="mt-4">Already have an account? <Link className="link" to={"/login"}>login</Link></p>
        </form>
      </div>
    </>
  );
}

export default Register;