import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cart_item } from "../helpers/request";
import { Link } from "react-router-dom";
import { removeCard } from "../helpers/request";
import { Toaster, toast } from "react-hot-toast";
import "./cart.css";

export default function Card_page() {
    const navigate = useNavigate()
    const [flag, setflag] = useState(null);
    const [login, setlogin] = useState(true)
    const [card, setcard] = useState([])
    let token = localStorage.getItem("token")
    useEffect(() => {
        if (token) {
            const products = cart_item(token);
            products.then(res => {
                setcard(res.data)
            })
            return setlogin(false)
        }
        else {
            return setlogin(true)
        }
    }, [token, flag])

    if (!login) {
        if (card.length == 0) {
            return (
                <>
                    <div>
                        <h1 className="cdp d-flex justify-content-center"> Cart empty</h1>
                    </div>
                </>
            );
        }
        return (
            <>
                <Toaster />
                <div className="container mt-5">
                    <div className="row border">
                        <div className="col-lg-7 col-sm-7 col-md-7">

                            {
                                card.map((item, ind) => (
                                    <div key={ind} className="row border-bottom border-end">
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <Link to={`/details/${item._id}`}>
                                                <img src={`http://localhost:3000/api/get_file/${item.image[0].filename}`} className="d-block w-100 image" alt="..." />
                                            </Link>
                                            <h1 className="fs-6 d-flex justify-content-center"><span onClick={() => item.quantity == 0 ? toast.error("out of stock !") : toast.success("Remove one successfully")} className="bi bi-dash-circle fs-5"></span><span className="border px-3">1</span><span onClick={() => item.quantity == 0 ? toast.error("out of stock !") : toast.success("Add one successfully")} className="bi bi-plus-circle fs-5"></span></h1>
                                        </div>
                                        <div className="col-lg-7">
                                            <Link to={`/details/${item._id}`}>
                                                <h1 className="fs-3 text-dark">{item.name}</h1>
                                            </Link>
                                            {item.quantity == 0 ? <h1 className="fs-4 text-danger  mt-3 mb-3 pb-5">Out of Stock !</h1> : <>
                                                <h2 className="fs-5">{item.discount}% Discount</h2>
                                                <p className="text-success">Spcial Price</p>
                                                <h2 className="fs-6"><span>${item?.discound_price}</span> <span className=" ms-4"> <strike> $ {item?.price} </strike></span></h2>
                                            </>
                                            }
                                            <button className="btn btn-danger p-1" onClick={() => {
                                                let cnf = confirm("are you sure ")
                                                if (cnf) {
                                                    let response = removeCard(item._id, token)
                                                    response.then(res => {
                                                        setflag(flag + 1)
                                                        toast(res.data)
                                                    })
                                                }
                                            }}>remove</button>
                                            <button className="btn btn-success p-1 ms-2"  >Order</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="col-lg-5 col-sm-5 col-md-5">

                        </div>
                    </div>
                </div>
                {/* {
                    card.map((item, ind) => (
                        <div key={ind} className=" borders container mt-3 mb-3">
                            <div className="row">
                                <div className="col-lg-3">
                                    <Link to={`/details/${item._id}`}>
                                        <img src={`http://localhost:3000/api/get_file/${item.image[0].filename}`} className="d-block w-100" alt="..." />
                                    </Link>
                                </div>
                                <div className="col-lg-3">
                                    <h1>{item.name}</h1>
                                    <h2>{item.discount}% Discount</h2>
                                    <p className="text-success">Spcial Price</p>
                            <h2><span>{item?.discound_price}</span> <span className="fs-4 ms-4"> <strike> $ {item?.price} </strike></span></h2>
                                </div>
                                <div className="col-lg-1">
                                    <button className="btn btn-danger mt-5" onClick={() => {
                                        let cnf = confirm("are you sure ")
                                        if (cnf) {
                                            let response = removeCard(item._id, token)
                                            response.then(res => {
                                                setflag(flag + 1)
                                                toast(res.data)
                                            })
                                        }
                                    }}>remove</button><br/>
                                    <button className="btn btn-success mt-5 ps-3 pe-3"  >Order</button>
                                </div>
                                <div className="col-lg-5">
                                <p className="desc">{item.description}</p>
                                <input className="mt-5" type="number"  min={1} placeholder="count"/>
                                </div>
                            </div>
                        </div>
                    ))
                } */}
            </>
        );
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                {
                    login ? <button className="cdp btn btn-warning" onClick={() => navigate("/login")}>Please Login Your Account</button> : <>
                        {
                        }
                    </>
                }
            </div>
        </>
    );
}