import express, { response } from "express";
import mongoose from "mongoose";
import path from 'node:path';
import { fileURLToPath } from "node:url";

import routerUsers from "./src/routes/routesUsers.js";
import routerSessions from "./src/routes/routesSessions.js";
import routerHouses from "./src/routes/routesHouses.js";

const server = express();

mongoose.connect("mongodb+srv://hmdev:9fME3ipnbD7WeEHB@cluster0.mioi2f8.mongodb.net/?retryWrites=true&w=majority");

server.use('/files',
    express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src', 'thumbnails'))
    //dirRaiz/src/thumbnail/<ROUTE/URL>
)

server.use(
    express.json(), // Para atender requests com type json(body)
    routerUsers,
    routerSessions,
    routerHouses
);


server.listen(3333, () => {
    console.log('Server listen in port 3333');
})