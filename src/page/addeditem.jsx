import { getAddeditem } from "../helpers/request";
import { useEffect, useState } from "react";
import { remove_product } from "../helpers/request";
import toast,{Toaster} from "react-hot-toast";
import "./cart.css"

export default function Addeditem() {
    const [data, setdata] = useState([])
    const [count,setcount] = useState(0)
    let token = localStorage.getItem("token");
    useEffect(() => {
        let response = getAddeditem(token)
        response.then(res => {
            setdata(res.data)
        })
    }, [count])
    if (data.length == 0) {
        return (
            <>
                <div>
                    <h1 className="cdp d-flex justify-content-center">No Item added</h1>
                </div>
            </>
        );
    }

    return (
        <>
        <Toaster/>
            <div className="tb container mt-5">
                <div className="row">
                    <div className="col-lg">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Discount Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, ind) => (
                                        <tr key={ind}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price}</td>
                                            <td>{item.discount}%</td>
                                            <td>{item.discound_price}</td>
                                            <button onClick={() => {
                                                let cnf = confirm("are you want to remove it !")
                                                if (cnf) {
                                                    let response = remove_product(item._id)
                                                    response.then(res =>{
                                                        setcount(count+1)
                                                        return  toast(res.data);
                                                    })
                                                }
                                            }} className="btn btn-danger text-dark" >Delete</button>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}