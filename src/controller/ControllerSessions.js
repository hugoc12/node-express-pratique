import Session from "../models/Session.js";

class ControllerSessions{
    async index(request, response){ // LISTAR SESSÕES
        try{
            let listSessions = await Session.find();
            return response.json(listSessions);
        }catch(err){
            return response.send(`ERROR: ${err}`);
        }
    }

    async store(request, response){ // REGISTRAR SESSÃO
        try{
            let id = request.params.id;
            let token = request.params.token;
            let sessionCreate = await Session.create({
                idUser:id,
                token
            })
            return response.json(sessionCreate);
        }catch(err){
            return response.send(`${err}`);
        }
    }
}

export default new ControllerSessions;