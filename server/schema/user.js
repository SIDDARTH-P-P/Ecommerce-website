import mongoose from "mongoose";

const user = new mongoose.Schema({
    image:{type:String},
    username:{type:String},
    email:{type:String},
    type:{type:String},
    password:{type:String},
})

export default mongoose.model.users || mongoose.model("user",user)