import { Router } from "express";
import * as fun from "./route_handler.js";
import Auth from "./middlewares/Auth.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination:"./server/product_img",
    filename:(req,file,cb)=>{
        cb(null,Date.now() + "-" + file.originalname)
    }
})
const uploder = multer({storage:storage})
const router = Router();

router.route("/register").post(fun.Register);
router.route("/login").post(fun.Login);
router.route("/additem").post(uploder.any(),Auth,fun.products);

router.route("/products").get(fun.GetProduct);

router.route("/get_file/:file").get(fun.get_file);

router.route("/get_details/:id").get(fun.get_details);
router.route("/profile").post(Auth,fun.profile);
router.route("/add_cart").post(Auth,fun.Addcard);
router.route("/get_cart").post(Auth,fun.get_cart);

router.route("/removeCard").post(Auth,fun.removeCard);
router.route("/addeditem").get(Auth,fun.Addeditem);
router.route("/remove_product").post(fun.remove_product)
export default router;