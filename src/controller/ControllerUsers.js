import User from "../models/User.js";
import mongoose from "mongoose";

class ControllerUsers {
    async index(request, response) { // LISTAR TODOS OS USUÁRIOS
        try {
            let listUsers = await User.find();
            return response.json(listUsers);
        } catch (err) {
            return response.send('Houve um erro na busca dos usuários');
        }
    }

    async indexId(request, response) { // LISTAR USUÁRIO POR ID
        if (mongoose.Types.ObjectId.isValid(request.params.id)) {
            let id = new mongoose.Types.ObjectId(request.params.id);
            try {
                await User.findById(id).then((user) => {
                    if (!user) {
                        throw new Error();
                    } else {
                        return response.json(user);
                    }
                });
            } catch (err) {
                return response.send('Usuário não existe!');
            }
        } else {
            return response.send('ID INVÁLIDO - BSONTypeError: o argumento passado deve ser uma sequência de 12 bytes ou uma sequência de 24 caracteres hexadecimais ou um número inteiro')
        }
    }

    async store(request, response) { // ADICIONAR USUÁRIO
        let { nickname, email, password, cellphone } = request.body;

        try {
            let user = await User.findOne({ email }).exec();
            console.log(user);
            if (!user) {
                let userCreate = await User.create({
                    nickname,
                    email,
                    password,
                    cellphone
                })
                return response.send(`Usuário - ${userCreate.id} - cadastrado com sucesso!`);
            } else {
                return response.send('Email de usuário já cadastrado.');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async updateId(request, response) {
        try{
            let id = request.params.id;
            let data = request.body;
            let dataBefore = await User.findById(id);
            let dataUpdate = await User.findByIdAndUpdate(id, data, {
                returnDocument:'after'
            });
            return response.json({dataBefore, dataUpdate});
        }catch(err){
            return response.send(`ERROR: ${err}`);
        }
    }
}

export default new ControllerUsers;