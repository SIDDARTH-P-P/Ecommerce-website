import axios from "axios"

export default function config(){
    (import.meta.env.MODE == "development") ? axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}` :
        axios.defaults.baseURL = location.origin
    }