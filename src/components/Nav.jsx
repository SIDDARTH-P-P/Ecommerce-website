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
        // let value = document.getElementById("search").value
        // let filter_datalist = apiData?.filter(item => item.name?.toLowerCase().includes(value?.toLowerCase()));
        // console.log(filter_datalist);

        if (token) {
            return setlogin(false)
        }
        else {
            return setlogin(true)
        }
    }, [token])
    return (
        <>
            <nav className="navbar navbar-expand-lg  bgclr ">
                <div className="container-fluid pt-3 pb-3">
                <img onClick={() => navigate("/")} className="logo ms-5 ps-5" src="./logo.png" alt="" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <p className="navbar-nav me-auto ms-auto  my-2 my-lg-0 navbar-nav-scroll">
                            <input onInput={search} list="list" id="search" className="search" type="search"
                                placeholder="search" />
                            <datalist id="list">
                            </datalist>
                        </p>
                        <h1><span onClick={() => navigate("/card")} className="fs-1 clr bi bi-cart"></span><span className="fs-1 bi bi-person-circle me-5 ms-5" onClick={() => login ? navigate("/login") : navigate("/profile")}></span></h1>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;