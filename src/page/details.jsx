import { Toaster, toast } from "react-hot-toast";
import { GetDatas } from "../helpers/request";
import { card_data } from "../helpers/request";

function addcard() {
    let productid = location.href.split("/")[4]
    let token = localStorage.getItem("token");
        if(!token){
            return toast.error("please login your account !")
        }
        let count = 1
       let card = card_data(productid,token);
        card.then(res => {
            toast(res.data)
        })
}

export default function Details() {
    let id = location.href.split("/")[4]
    const [{ Loading, status, apiData, error }] = GetDatas(`/api/get_details/${id}`)
    return (
        <>
            <Toaster />
            {
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mt-5" style={{ width: "18rem" }}>
                                {apiData && <img src={`http://localhost:3000/api/get_file/${apiData?.image[0].filename}`} className="d-block w-100" alt="..." />}
                            </div>
                            <div className="mt-5">
                                <button className="btn btn-success ms-4 me-4">Buy Now</button> <button className="btn btn-warning" onClick={() => addcard()}>Add to card</button>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <h1 className="pt-5">{apiData?.name}</h1>
                            <p className="text-success">Spcial Price</p>
                            <h2><span>$ {apiData?.discound_price}</span> <span className="fs-4 ms-4"> <strike> $ {apiData?.price} </strike></span></h2>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}