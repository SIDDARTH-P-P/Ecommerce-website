import "./nav.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetDatas } from "../helpers/request";

function Nav({setData}) {
    const navigate = useNavigate();
    const [login, setlogin] = useState(true)
    let token = localStorage.getItem("token")
    const [{ Loading, status, apiData, error }] = GetDatas(`/api/products`);
    console.log(apiData)
    const search = (e) => {
        let value = e.target.value;
        let filter_datalist = apiData?.filter(item => item.name?.toLowerCase().includes(value?.toLowerCase()));
        setData(filter_datalist);
    }
    
    useEffect(() => {
        setData(apiData);

    },[apiData])

    useEffect(() => {
        if (token) {
            return setlogin(false)
        }
        else {
            return setlogin(true)
        }
    }, [token])

    return (
        <>
            <nav className="navbar navbar-expand-md bgclr sticky-top">
                <div className="container-fluid">
                <img onClick={() => navigate("/")} className="logo ms-5 ps-5" src="./logo2.png" alt="" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <p className="navbar-nav me-auto ms-auto  my-2 my-lg-0 navbar-nav-scroll">
                            <input onInput={search} list="list-abc" id="search" className="search" type="search"
                                placeholder="search" />
                            <datalist id="list-abc">
                                {apiData?.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </datalist>
                        </p>
                        <h1><span onClick={() => navigate("/card")} className="text-light fs-2 clr bi bi-cart"></span><span className="text-light fs-2 bi bi-person-circle me-5 ms-5" onClick={() => login ? navigate("/login") : navigate("/profile")}></span></h1>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;