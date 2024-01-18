import { Link } from "react-router-dom";
import "./cart.css"
export default function Card({ data }) {
    if(data?.length == 0){
        return(
            <>
            <div className="d-flex justify-content-center min">
            <h1>Item not found !</h1>
            </div>
            </>
        )
    }
    return (
        <>
            {
                data?.map((item, index) => (
                    <Body key={index}>
                        <Link to={`/details/${item._id}`}>
                            <div className="card">
                                <img src={`http://localhost:3000/api/get_file/${item.image[0].filename}`} className="d-block w-100" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text text-dark">{item.name}</h5>
                                    <p className="text-decoration-none">${item.discound_price}</p>
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
        <div className="col-lg-3 col-sm-6 col-md-4 col-6">
            {children}
        </div>
    )
}
