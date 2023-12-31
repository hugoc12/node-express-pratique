import User from "../models/User.js";
import mongoose from "mongoose";
import * as yup from 'yup';

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
        try {
            let { nickname, email, password, cellphone } = request.body;
            let user = await User.findOne({ email }).exec();
            if (!user) {
                let schemaValidation = yup.object().shape({
                    nickname: yup.string().required(),
                    email:yup.string().email('/^[^\s@]+@[^\s@]+\.[^\s@]+$/'),
                    password:yup.string().required(),
                    cellphone:yup.string().required()
                })

                await schemaValidation.isValid(request.body).then((mens)=>{
                    if(!mens){
                        throw new Error(`ERRO: ${mens}`)
                    }
                });

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
            return response.send('ERRO DE GRAVAÇÃO');
        }
    }

    async updateId(request, response) { // ATUALIZAR DADOS DE USUÁRIO
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

    async deleteUser(request, response) {
        try{
            await User.findByIdAndDelete(request.params.id);
            return response.send('User removed!');
        }catch(err){
            return response.send(`ERR:${err}`);
        }
    }
}

export default new ControllerUsers;