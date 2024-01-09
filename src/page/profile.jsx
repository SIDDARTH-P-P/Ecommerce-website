import { useNavigate } from "react-router-dom";
import { getprofile } from "../helpers/request";

export default function Profile() {
    const navigate = useNavigate()
    let token = localStorage.getItem("token");
    if (token) {
        const [{ Loading, status, apiData, error }] = getprofile(token)
        return (
            <>
                <div className="wrapper">
                    <form className="form-signin ht">
                        <div className="container">
                            <div className="image">
                            <img className="ms-5" src={apiData?.userdata.image ? apiData?.userdata.image : "/R.png" } alt="" />
                            </div>
                            <h1>hello : {apiData?.userdata.username}</h1>
                            {
                                apiData?.userdata.type == "buyer" ? <button className="btn btn-warning me-2 p-1 ms-4 me-3" >Order details</button> : <><button className="btn btn-info p-1" onClick={() => navigate("/Additem")}>click sell</button><button className="btn btn-warning p-1 mx-3" >Order details</button></>
                            }
                            <button className="btn btn-danger p-1" onClick={() => {
                                localStorage.removeItem("token")
                                let cnf = confirm("are you sure do wnat to logout !")
                                if (cnf) {
                                    return navigate("/")
                                }
                            }}>logout</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    return (
        navigate("/")
    )
} 