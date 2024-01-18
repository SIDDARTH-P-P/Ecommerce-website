import Nav from "./components/Nav";
import Register from "./page/Register";
import Login from "./page/Login";
import config from "./config";
import Additem from "./page/Additem";
import Home from "./page/home";
import Details from "./page/details";
import Profile from "./page/profile";
import Card_page from "./page/cart_page";
import Addeditem from "./page/addeditem";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/footer";
config()

function App() {
    const [data, setData] = useState();
    return (
        <>
                <BrowserRouter>
                    <Nav setData={setData}/>
                    <Routes>
                        <Route path="/" element={<Home data={data} />} />
                        <Route path="/details/:id" element={<Details />} />
                        <Route path="additem" element={<Additem setData={setData} data={data}/>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/card" element={<Card_page/>}/>
                        <Route path="/addeditem" element={<Addeditem/>} />
                    </Routes>
                    <Footer/>
                </BrowserRouter>
        </>
    );
}

export default App;