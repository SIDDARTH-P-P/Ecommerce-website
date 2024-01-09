import { Toaster } from "react-hot-toast";
import Cart from "../components/Cart";

export default function Home({data}){
    return(
        <>
        <Toaster />
        <div className="container">
            <div className="row mt-5">
                <Cart data={data}/>
            </div>
        </div>
        </>
    );
}