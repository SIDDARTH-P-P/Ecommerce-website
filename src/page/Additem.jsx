import toast, { Toaster } from "react-hot-toast";
import "./add_item.css"
import { Addproducts } from "../helpers/request";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Additem() {
    const navigate = useNavigate()
    let token = localStorage.getItem("token");
    function data(event) {
        event.preventDefault();
        const formdata = new FormData(event.target)
        formdata.append("discound_price", dis())
        let response = Addproducts(formdata, token)
        response.then(res => {
            console.log(res.data);
            navigate("/")
            toast(res.data)
        })
    }
    function dis() {
        let price = document.getElementById("price").value
        let discound = document.getElementById("discount").value
        let discound_price = price - (discound / 100) * price
        document.getElementById("discound_price").innerText = `discound price is : ${discound_price} `
        return discound_price
    }
    return (
        <>
            <Toaster />
            <div className="wrapper">
                <form className="form-signin ht" onSubmit={data} >
                    <div className="container">
                        <div className="row pt-5">
                            <div className="col-lg-6 pe-0">
                                <input type="text" className="form-control" name="name" placeholder="Name" required="" />
                                <input type="number" className="form-control" name="quantity" placeholder="Quantity" min={0} required="" />
                                <input className="form-control" type="text" name="price" id="price" placeholder="Price" />
                            </div>
                            <div className="col-lg-6 ps-0">
                                <input multiple className="file" type="file" name="image" id="avatar" accept="image/*" />
                                <label className="form-control" htmlFor="avatar"><span className="bi bi-file-earmark-image"> Images</span></label>
                                <input className="form-control" type="text" name="category" placeholder="Category" />
                                <input onInput={dis} id="discount" type="text" className="form-control" name="discount" placeholder="Discound" />
                            </div>
                        </div>
                        <input className="form-control" type="text" name="description" id="" placeholder="description" />
                        <p className="mb-0" id="discound_price">discound price is : 0 </p>
                        <input type="submit" className="form-control" value="submit" />
                    </div>
                    <Link className="text-decoration-none" to="/addeditem">Added item</Link>
                </form>
            </div>
        </>
    );
}

export default Additem;