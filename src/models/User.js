import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nickname:String,
    email:String,
    password:String,
    cellphone:String,
})

export default model('User', UserSchema);