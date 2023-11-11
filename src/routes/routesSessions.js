import { Router } from 'express';
import ControllerSessions from "../controller/ControllerSessions.js";
const routerSessions = new Router();

routerSessions.route('/sessions')
    .get(ControllerSessions.index)

routerSessions.route('/session/:id')
    .delete(ControllerSessions.logout)

routerSessions.route('/session/:id/:token')
    .post(ControllerSessions.store)

export default routerSessions;