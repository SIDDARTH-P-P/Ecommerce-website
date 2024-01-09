import { GetDatas } from "../helpers/request";
import { Link } from "react-router-dom";
import "./cart.css"

export default function Card({data}) {
    const [{ Loading, status, apiData, error }] = GetDatas(`/api/products`)
    console.log(data);
    return (
        <>
            {
             data?.map((item, index) => (
                    <Body key={index}>
                        <Link to={`/details/${item._id}`}>
                            <div className="card mt-5" style={{ width: "18rem" }}>
                                <img src={`http://localhost:3000/api/get_file/${item.image[0].filename}`} className="d-block w-100" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p>${item.discound_price}</p>
                                </div>
                            </div>
                        </Link>
                    </Body>
                ))
            }

        </>
    );
}

function Body({ children }) {
    return (
        <div className="col-lg-3">
            {children}
        </div>
    )
}





// {
//     item.image?.map((img, index) => (
//         <div key={index} className="carousel-item active">
//             <img src={`http://localhost:3000/api/get_file/${img.filename}`} className="d-block w-100" alt="..." />
//         </div>
//     ))
// }