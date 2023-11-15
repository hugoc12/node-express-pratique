import House from "../models/House.js";
import mongoose from "mongoose";

class ControllerHouses {
    async index(request, response) {
        try {
            let idUser = request.headers.iduser;
            if (request.query.myhouses == 'true') {
                let listHouses = await House.find({ owner: idUser });
                return response.json(listHouses);
            } else {
                let listHouses = (await House.find({ status: true })).filter((el) => {
                    return el.owner != idUser;
                })//Listando casas que não pertencem ao usuário e estão disponíveis.
                return response.json(listHouses);
            }

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
            let idUser = request.headers.iduser;
            let idHouse = request.params.id;
            let house = await House.findById(idHouse);
            console.log(house);
            console.log(idUser);
            if (house.owner == idUser) {
                let houseDelete = await House.findByIdAndDelete(idHouse);
                return response.json({ houseDelete });
            } else {
                return response.status(401).send('A casa não pertence ao usuário.')
            }

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
            console.log(houseBefore);
            console.log(userId);
            if (houseBefore.owner == String(userId)) {
                let houseUpdate = await House.findByIdAndUpdate(request.params.id, {
                    owner: userId,
                    thumbnail: newImg.filename,
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
                }, {
                    returnDocument: 'after'
                })

                return response.status(200).json({
                    houseBefore,
                    houseUpdate
                })
            }else{
                return response.status(401).send('A casa não pertence ao usuário!')
            }
        } catch (err) {
            return response.send(`ERR:${err}`);
        }
    }
}


export default new ControllerHouses;