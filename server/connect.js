import mongoose from "mongoose";

export default function connect_DB(){
    return mongoose.connect(process.env.DB_URI)
}