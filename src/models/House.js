import { Schema, model } from "mongoose";
import dbtest from "../services/mongodb/connectDbtest.js";

const HouseSchema = new Schema({
    owner: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    thumbnail:String,
    description:String,
    location:Map,
    price:Number,
    status:Boolean,
}, {
    collection:'houses',
    toJSON:{
        virtuals:true,
    }
}
)

//VARIÁVEL PREDEFINIDA NO SCHEMA,São propriedades calculadas com base em outros campos dos seus documentos.
HouseSchema.virtual('thumbnail_url').get(function(){ // OBS.: NÃO PODEMOS UTILIZAR ARROW FUNCION
    return `http://localhost:3333/files/${this.thumbnail}`
})

export default dbtest.model('House', HouseSchema);