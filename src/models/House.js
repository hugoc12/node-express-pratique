import { Schema, model } from "mongoose";

const HouseSchema = new Schema({
    owner: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    thumbnail:String,
    description:String,
    location:Map,
    price:Number,
    status:Boolean
})

export default model('House', HouseSchema);