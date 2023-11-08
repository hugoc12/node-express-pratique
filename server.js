import express from "express";
import mongoose from "mongoose";

import routerUsers from "./src/routes/routesUsers.js";
import routerSessions from "./src/routes/routesSessions.js";
import routerHouses from "./src/routes/routesHouses.js";

const server = express();

mongoose.connect("mongodb+srv://hmdev:9fME3ipnbD7WeEHB@cluster0.mioi2f8.mongodb.net/?retryWrites=true&w=majority");

server.use(
    express.json(), // Para atender requests de body type json
    routerUsers,
    routerSessions,
    routerHouses
);


server.listen(3333, ()=>{
    console.log('Server listen in port 3333');
})