import House from "../models/House.js";
import mongoose from "mongoose";

class ControllerHouses {
    async index(request, response) {
        try {
            let idUser = request.headers.iduser;
            let listHouses = (await House.find()).filter((el)=>{
                return el.owner != idUser && el.status;
            });
            return response.json(listHouses);
        } catch (err) {
            return response.send(`ERROR - ${err}`);
        }
    }

    async indexId(request, response) {
        try {
            let house = await House.findById(request.params.id);
            return response.json(house);
        } catch (err) {
            return response.send(`ERRO:${err}`);
        }
    }

    async store(request, response) {
        try {
            let idUser = new mongoose.Types.ObjectId(request.headers.iduser);
            let { description, rua, numero, bairro, cep, cidade, estado, price, status } = request.body;
            let thumbnail = request.file

            let houseCreate = await House.create({
                owner: idUser,
                thumbnail: thumbnail.filename,
                description,
                location: {
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
        } catch (err) {
            return response.send(`ERRO - ${err}`);
        }
    }

    async delete(request, response) {
        try {
            let idHouse = request.params.id;
            let houseDelete = await House.findByIdAndDelete(idHouse);
            return response.json({houseDelete});
        } catch (err) {
            return response.send(`ERROR: ${err}`);
        }
    }

    async updateId(request, response) {
        try {
            let { description, rua, numero, bairro, cep, cidade, estado, price, status } = request.body;
            let userId = new mongoose.Types.ObjectId(request.headers.iduser);
            let newImg = request.file;
            let houseBefore = await House.findById(request.params.id);
            let houseUpdate = await House.findByIdAndUpdate(request.params.id, {
                owner: userId,
                thumbnail:newImg.filename,
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
            }, {
                returnDocument:'after'
            })

            return response.json({
                houseBefore,
                houseUpdate
            })
        } catch (err) {
            return response.send(`ERR:${err}`);
        }
    }
}


export default new ControllerHouses;