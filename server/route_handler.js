import user from "./schema/user.js";
import bcrypt from "bcrypt";
import productschema from "./schema/product.js";
import path from "path";
import jwt from "jsonwebtoken";
import cart from "./schema/card.js";
import fs from "fs"

const { sign } = jwt;

export async function Register(req, res) {
    try {
        let { username, image, email, type, password } = req.body
        let check = await user.findOne({ username })
        if (check) {
            return setTimeout(() => {
                res.status(404).json("user already existe");
            }, 500)
        }
        let hash = await bcrypt.hash(password, 10);
        let data = await user.create({
            username,
            image,
            email,
            type,
            password: hash
        })
        if (data) {
            setTimeout(() => {
                return res.status(200).json("Account create successs")
            }, 500)
        }
    } catch (error) {
        console.log(error);
    }
}


export async function Login(req, res) {
    try {
        let { username, password } = req.body
        let check = await user.findOne({ username })
        if (!check) {
            return res.status(404).json("user not found")
        }
        let hash = await bcrypt.compare(password, check.password)
        if (hash) {
            let token = await sign({ username: check.username, id: check._id }, process.env.SECRET_KEY, { expiresIn: "24h" })
            return res.status(200).json({ msg: "login successfully", token });
        }
        return res.status(403).json("invalid username or password");
    } catch (error) {
        console.log(error);
    }
}


export async function products(req, res) {
    let { id } = req.user
    try {
        let { name, quantity, price, Category, discount, discound_price, description } = req.body
        let data = await productschema.create({
            image: req.files,
            name,
            quantity,
            price,
            Category,
            discount,
            discound_price,
            description,
            userid: id
        })
        res.status(200).json("successfully added")
    } catch (error) {
        console.log(error);
    }
}

export async function GetProduct(req, res) {
    let data = await productschema.find()
    res.status(200).json(data)
}

export function get_file(req, res) {
    let { file } = req.params
    return res.sendFile(path.resolve(`./server/product_img/${file}`))
}


export async function get_details(req, res) {
    let { id } = req.params
    let result = await productschema.findOne({ _id: id })
    res.json(result)
}


export async function profile(req, res) {
    let { id } = req.user;
    let userdata = await user.findOne({ _id: id });
    if (userdata) {
        return res.status(200).json({
            msg: "User data",
            userdata
        })
    }
    return res.status(404).json({
        msg: "Unknown user!"
    })
}

export async function Addcard(req, res) {
    let { productid} = req.body;
    let { id } = req.user;
    let find = await cart.findOne({ userid: id, productid })
    if (find) {
        return res.status(200).json("Already added card !")
    }
    let add = await cart.create({
        userid: id,
        productid,
        count: 1,
    })
    return res.status(200).json("Successfully Added card")
}


export async function get_cart(req, res) {
    ;
    let { id } = req.user;
    let data = await cart.find({ userid: id });
    let productsid = data.map(item => item.productid);
    let products = await productschema.find({ _id: { $in: productsid } });
    res.status(200).json(products);
}


export async function removeCard(req, res) {
    let { productid } = req.body;
    let { id } = req.user;
    let remove = await cart.deleteOne({ userid: id, productid: productid })
    if (remove) {
        return res.status(200).json("Removed");
    }
}

export async function Addeditem(req, res) {
    let { id } = req.user
    let addedata = await productschema.find({ userid: id })
    res.status(200).json(addedata);
}

export async function remove_product(req, res) {
    let { id } = req.body
    let find = await productschema.findOne({ _id: id })
    if (find) {
        find.image.map((item) => {
            fs.rm(`./server/product_img/${item.filename}`, (error) => {
                console.log(error)
            })
        })
        let remove = await productschema.deleteOne({ _id: id })
        if (remove) {
            res.status(200).json("Product Successfully removed !")
        }
    }
}