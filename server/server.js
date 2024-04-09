import express from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";


const server = express();
const port = 8080;
const ready = ()=> console.log(`server ready on port ${port}`);

server.listen(port,ready);

server.use(express.urlencoded({extended: true}));
server.use(express.json());


server.use("/", indexRouter)
server.use(errorHandler)
server.use(pathHandler)
//router
server.get("/", async(req,res,next)=>{
        try {
            return res.json({
                response: "Coder Api",
            })
        } catch (error) {
            next(error)
        }
})




//endpoints para UsersManager


