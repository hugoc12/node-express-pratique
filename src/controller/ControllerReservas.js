import Reservas from "../models/Reservas.js";
import House from "../models/House.js";

class ControllerReservas{
    async myReservations(request, response){
        try{
            let listReserve = await Reservas.find({
                idUser:request.headers.iduser // RESERVAS QUE PERTENCEM AO USUÁRIO ATIVO
            });
            return response.json(listReserve);
        }catch(err){
            return response.send(`ERR:${err}`);
        }
    }

    async store(request, response){
        try{
            let {iduser, idhouse} = request.headers;
            let house = await House.findById(idhouse);

            if(house.owner != iduser && house.status){ // SE A CASA NÃO PERTENCER AO USUÁRIO QUE DESEJA FAZER A RESERVA && ESTÁ DISPONÍVEL PARA RESERVA
                let reserve =  await Reservas.create({
                    idUser:iduser,
                    idHouse:idhouse
                })

                await House.findByIdAndUpdate(idhouse, {
                    status:false // INDISPONIBILIZANDO CASA PARA RESERVA
                })

                return response.json('RESERVA REALIZADA!')
            }else{
                throw new Error('A casa pertence ao usuário ativo.')
            }
        }catch(err){
            return response.send(`ERR:${err}`);
        }
    }

    async delete(request, response){
        try{
            let {idreserva, iduser} = request.headers;
            let reserva = await Reservas.findById(idreserva).then((mens)=>{
                if(!mens){throw new Error('RESERVA NÃO ENCONTRADA!')}else{
                    //console.log(mens.idUser);
                    return mens
                }
            });
            console.log(reserva);
            if(reserva.idUser == iduser){ // DEVEMOS NOS CERTIFICAR DE QUE A RESERVA PERTENCE A AQUELE USUÁRIO.
                await Reservas.findByIdAndDelete(idreserva); // RESERVA CANCELADA
                await House.findByIdAndUpdate(reserva.idHouse, {  // CASA DISPONIBILIZADA NOVAMENTE
                    status:true
                })
                return response.send('Reserva cancelada!');
            }else{
                return response.send('Houve um erro, essa reserva pode não pertencer a esse usuário.')
            }
        }catch(err){
            return response.send(`ERR:${err}`);
        }
    }
}

export default new ControllerReservas