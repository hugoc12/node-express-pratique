import { Schema, model } from "mongoose";
import dbtest from "../services/mongodb/connectDbtest.js";

const ReservaSchema = new Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    idHouse:{
        type:Schema.Types.ObjectId,
        ref:'House'
    },
},{
    collection:'reservas'
})

export default dbtest.model('Reserva', ReservaSchema);