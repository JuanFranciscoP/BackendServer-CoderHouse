import Router from "express";
import apiRouter from "./api/index.api.js";


const indexRouter = Router();

indexRouter.use("/api", apiRouter)
indexRouter.get("/", async(req,res,next)=>{
    try {
        return res.json({
            response: "Coder Api OK!",
        })
    } catch (error) {
        next(error)
    }
})

export default indexRouter