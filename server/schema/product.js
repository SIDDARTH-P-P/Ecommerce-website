import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    userid:{type:String},
    name:{type:String},
    quantity:{type:String},
    price:{type:Number},
    image:{type:Array},
    Category:{type:String},
    discount:{type:Number},
    discound_price:{type:Number},
    description:{type:String},
})

export default mongoose.model.products || mongoose.model("product",productschema);