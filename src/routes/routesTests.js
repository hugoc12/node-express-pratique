import { Router } from "express";
import ControllerAlunos from "../controller/ControllerAlunos.js";

const routerAlunos = new Router();

routerAlunos.route('/alunos')
    .post(ControllerAlunos.addAluno);

export default routerAlunos;