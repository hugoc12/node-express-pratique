import express from "express";
import path from 'node:path';
import { fileURLToPath } from "node:url";

import routerUsers from "./src/routes/routesUsers.js"; //dbtest
import routerSessions from "./src/routes/routesSessions.js"; //dbtest
import routerHouses from "./src/routes/routesHouses.js"; //dbtest
import routerReservas from "./src/routes/routesReservas.js"; //dbtest
import routerAlunos from "./src/routes/routesTests.js"; //dbhm

const server = express();

server.use('/files',
    express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src', 'thumbnails'))
    //dirRaiz/src/thumbnail/<ROUTE/URL>
)

server.use(
    express.json(), // Para atender requests com type json(body)
    routerUsers,
    routerSessions,
    routerHouses,
    routerReservas,
    routerAlunos,
);


server.listen(3333, () => {
    console.log('Server listen in port 3333');
})