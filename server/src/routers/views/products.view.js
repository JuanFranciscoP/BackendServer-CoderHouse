import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/", (req,res,next)=>{
    try {
        return res.render("products")
    } catch (error) {
        next(error)
    }
})

export default productsRouter