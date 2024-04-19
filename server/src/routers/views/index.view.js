import { Router } from "express";
import usersRouter from "./users.view.js";
import productsRouter from "./products.view.js";

const viewsRouter = Router()

viewsRouter.use("/products", productsRouter)
viewsRouter.use("/users", usersRouter)
viewsRouter.get("/", (req,res,next)=>{
    try {
        return res.render("index")
    } catch (error) {
        next(error)
    }
})

export default viewsRouter