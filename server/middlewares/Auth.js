import jwt from "jsonwebtoken";

const { verify } = jwt;

export default async function Auth(req, res, next) {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        let user = verify(token, process.env.SECRET_KEY);
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(401).json("Unauthorized access!")
    } catch (error) {
        console.log(error);
        return res.status(401).json("Unauthorized access!");
    }
}