import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";


const apiRouter = Router()

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);

apiRouter.get("/", async(req,res,next)=>{
    try {
        return res.json({
            response: "Coder Api",
        })
    } catch (error) {
        next(error)
    }
})
export default apiRouter