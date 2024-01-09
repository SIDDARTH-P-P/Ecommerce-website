import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";




export function UserRegister(data) {
    let response = axios.post(`/api/register`, data)
    return response;
}

export function userLogin(data) {
    let response = axios.post(`/api/login`, data)
    return response;
}

export function Addproducts(data,token) {
   let response =  axios.post(`/api/additem`, data,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}


export function GetDatas(url) {
    const [data, setdata] = useState({
        Loading: false,
        status: null,
        apiData: null,
        error: null
    });
    useEffect(() => {
        setdata((prev) => ({ ...prev, loading: true }))
        axios.get(url)
            .then(res => {
                setdata((prev) => ({ ...prev, apiData: res.data, status: res.status }))
            })
            .catch(error => {
                setdata((prev) => ({ ...prev, error }))
            })
            .finally(() => {
                setdata((prev) => ({ ...prev, loading: false }))
            })
    }, [url])
    return [data]
}



export function getprofile(token) {
    const [data, setdata] = useState({
        loading: null,
        status: null,
        apiData: null,
        error: null,
    });
    useEffect(() => {
        if (token) {
            setdata((prev) => ({ ...prev, loading: true }))
            axios.post("/api/profile", null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    setdata((prev) => ({ ...prev, apiData: res.data, status: res.status }))
                })
                .catch(error => {
                    setdata((prev) => ({ ...prev, error }))
                })
                .finally(() => {
                    setdata((prev) => ({ ...prev, loading: false }))
                })
        }
    }, [token])

    return [data];
}


export function card_data(productid, token) {
    let response = axios.post(`/api/add_cart`, { productid}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}


export function cart_item(token) {
    let response = axios.post(`/api/get_cart`,null,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}


export function removeCard(productid,token){
    let response = axios.post(`/api/removeCard`,{productid},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export function getAddeditem(token){
    let response = axios.get(`/api/addeditem`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export function remove_product(id){
    let response = axios.post(`/api/remove_product`,{id})
    return response;
}