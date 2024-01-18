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
    const [sum, setSum] = useState({});
    let token = localStorage.getItem("token")
    useEffect(() => {
        if(card.length > 0) {
            let sum = card?.reduce((a, b) => {
                let price = a.price + b.price;
                let discound_price = a.discound_price + b.discound_price;
                let discount = a.discount + b.discount
                return { price, discound_price,discount}
            })
            setSum(sum);
        }
    })
    console.log(sum);
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
                    <div className="min">
                        <h1 className="cdp d-flex justify-content-center"> Cart empty</h1>
                    </div>
                </>
            );
        }
        return (
            <>
                <Toaster />
                <div className="container mt-5 border min">
                    <div className="row">
                        <div className="col-lg-7 col-sm-12 col-md-12 border">
                            {
                                card.map((item, ind) => (
                                    <div key={ind} className="row border-bottom border-3 border-end">
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            <Link to={`/details/${item._id}`}>
                                                <img src={`http://localhost:3000/api/get_file/${item.image[0].filename}`} className="d-block w-100 image" alt="..." />
                                            </Link>
                                            <h1 className="fs-6 d-flex justify-content-center"><span onClick={() => item.quantity == 0 ? toast.error("out of stock !") : toast.success("Remove one successfully")} className="bi bi-dash-circle fs-5"></span><span className="border px-3">1</span><span onClick={() => item.quantity == 0 ? toast.error("out of stock !") : toast.success("Add one successfully")} className="bi bi-plus-circle fs-5"></span></h1>
                                        </div>
                                        <div className="col-lg-7 col-md-7 col-sm-7">
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
                        <div className="col-lg-5 col-sm-12 col-md-12 d-flex justify-content-center">
                            <div className="row">
                                <div className="clo-lg col-md col-sm">
                                    <div className="login-page ">
                                        <div className="form">
                                            <h1 className="m-0 p-0 fs-5 border-bottom">PRICE DETAILS</h1>
                                            <p className="fs-6 d-flex justify-content-start">price ({card.length}item) - ₹ {sum.price}</p>
                                            <p className="fs-6 d-flex justify-content-start">Discount - <span className="text-success">{sum.discount}%</span></p>
                                            <p className="fs-6 d-flex justify-content-start" >Delivery Charges 40</p>
                                            <p className="border-top"></p>
                                            <h4 className="fs-4 d-flex justify-content-start"  >Total Amount : ₹{Math.floor(sum.discound_price)}</h4>
                                            <p className="border-top"></p>
                                            <p className="text-success">You will save ₹{Math.floor(sum.price - sum.discound_price)} on this order</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
        <div className="min">
            <div className="d-flex justify-content-center">
                {
                    login ? <button className="cdp btn btn-warning " onClick={() => navigate("/login")}>Please Login Your Account</button> : <>
                        {
                        }
                    </>
                }
            </div>
            </div>
        </>
    );
}