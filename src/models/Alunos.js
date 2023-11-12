import { model, Schema } from "mongoose";
import dbhm from "../services/mongodb/connectDbdm.js";

const AlunoSchema = new Schema({
    nome:String,
    idade:String,
    curso:String,
}, {
    collection:'sala1'
})

export default dbhm.model('Aluno', AlunoSchema);