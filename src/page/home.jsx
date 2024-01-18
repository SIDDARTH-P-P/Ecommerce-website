import { Toaster } from "react-hot-toast";
import Cart from "../components/Cart";
import Carousel from "../components/carousel";
export default function Home({data}){
    return(
        <>
        <Toaster />
        <Carousel/>
        <div className="container">
            <div className="row mt-5">
                <Cart data={data}/>
            </div>
        </div>
        </>
    );
}