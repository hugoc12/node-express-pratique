import { Schema, model } from "mongoose";

const SessionSchema = new Schema({
    idUser:String,
    token:String
})

export default model('Session', SessionSchema);