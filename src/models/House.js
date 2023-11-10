import { Schema, model } from "mongoose";

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
    toJSON:{
        virtuals:true,
    }
}
)

//VARIÁVEL PREDEFINIDA NO SCHEMA
HouseSchema.virtual('thumbnail_url').get(function(){ // OBS.: NÃO PODEMOS UTILIZAR ARROW FUNCION
    return `http://localhost:3333/files/${this.thumbnail}`
})

export default model('House', HouseSchema);