import { Router } from "express";
import ControllerReservas from "../controller/ControllerReservas.js";

const routerReservas = new Router();

routerReservas.route('/reservationmade')
    .post(ControllerReservas.store)

routerReservas.route('/myreservations')
    .get(ControllerReservas.myReservations)

routerReservas.route('/reserva')
    .delete(ControllerReservas.delete)

export default routerReservas;