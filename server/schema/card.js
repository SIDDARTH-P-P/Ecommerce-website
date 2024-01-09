import mongoose from "mongoose";

const Cart = new mongoose.Schema({
    userid:{type:String},
    productid:{type:String},
    count:{type:Number},
})

export default mongoose.model.cards || mongoose.model("Card",Cart);