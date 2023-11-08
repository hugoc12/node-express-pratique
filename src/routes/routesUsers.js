import {Router} from "express";
import ControllerUsers from "../controller/ControllerUsers.js";
const routerUsers = new Router();

routerUsers.route('/users') //REQUESTS TO COLLECTION/TABLE - (NOSQL/SQL)
    .get(ControllerUsers.index)
    .post(ControllerUsers.store)

routerUsers.route('/user/:id') //REQUESTS TO DUCUMENT/LINE - (NOSQL/SQL)
    .get(ControllerUsers.indexId)
    .put(ControllerUsers.updateId)

export default routerUsers;