import House from "../models/House.js";
import mongoose from "mongoose";

class ControllerHouses{
    async index(request, response){
        try{
            let listHouses = await House.find();
            return response.json(listHouses);
        }catch(err){
            return response.send(`ERROR - ${err}`);
        }
    }

    async store(request, response){
        try{
            let idUser = new mongoose.Types.ObjectId(request.header.userId);
            let {description, rua, numero, bairro, cep, cidade, estado, price, status} = request.body;
            let thumbnail = request.file

            let houseCreate = await House.create({
                owner:idUser,
                thumbnail:thumbnail.filename,
                description,
                location:{
                    rua,
                    numero,
                    bairro,
                    cep,
                    cidade,
                    estado,
                },
                price,
                status,
            })
            return response.json(houseCreate);
        }catch(err){
            return response.send(`ERRO - ${err}`);
        }
    }

    async delete(request, response){
        try{
            let idHouse = request.params.id;
            let houseDelete = await House.findByIdAndDelete(idHouse);
            console.log(houseDelete);
            return response.send('House deleted!');
        }catch(err){
            return response.send(`ERROR: ${err}`);
        }
    }
}


export default new ControllerHouses;