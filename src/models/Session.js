import { Schema, model } from "mongoose";
import dbtest from "../services/mongodb/connectDbtest.js";

const SessionSchema = new Schema({
    idUser:String,
    token:String
},{
    collection:'sessions'
})

export default dbtest.model('Session', SessionSchema);