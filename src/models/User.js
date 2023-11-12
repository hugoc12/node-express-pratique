import { Schema, model } from "mongoose";
import dbtest from "../services/mongodb/connectDbtest.js";

const UserSchema = new Schema({
    nickname:String,
    email:String,
    password:String,
    cellphone:String,
},{
    collection:'users'
})

export default dbtest.model('User', UserSchema);