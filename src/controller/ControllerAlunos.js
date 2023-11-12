//import Alunos from "../models/Alunos.js";
import Alunos from "../models/Alunos.js";

class ControllerMatriculas{
    async addAluno(request, response){
        try{
            let data = request.body;
            //await Alunos.create(data);
            await Alunos.create(data);
            return response.send('USUÁRIO ADICIONADO!');
        }catch(err){
            return response.send(`ERR:${err}`)
        }
    }
}

export default new ControllerMatriculas;