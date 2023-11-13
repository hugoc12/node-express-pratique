import { model, Schema } from "mongoose";
import dbhm from "../services/mongodb/connectDbdm.js";

const AlunoSchema = new Schema({
    nome:{
        type:String,
        required: true,
    },
    idade:{
        type:String,
        required:true,
    },
    curso:{
        type:String,
        required:true,
    }
}, {
    collection:'sala1'
})

export default dbhm.model('Aluno', AlunoSchema);