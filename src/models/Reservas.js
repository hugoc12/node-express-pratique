import { Schema, model } from "mongoose";

const ReservaSchema = new Schema({
    idUser:String,
    idHouse:String,
})

export default model('Reserva', ReservaSchema);