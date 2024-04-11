import express from "express";
import morgan from "morgan";
import {engine} from "express-handlebars"
import path from 'path'

import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";

const server = express();
const port = 8080;
const ready = () => console.log(`server ready on port ${port}`);

server.listen(port, ready);


server.engine('handlebars', engine())
server.set("views", path.join(__dirname, '../views'))
server.set('view engine', 'handlebars')


server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
