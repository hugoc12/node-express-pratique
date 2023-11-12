import { Schema, model } from "mongoose";
import dbtest from "../services/mongodb/connectDbtest.js";

const ReservaSchema = new Schema({
    idUser:String,
    idHouse:String,
},{
    collection:'reservas'
})

export default dbtest.model('Reserva', ReservaSchema);