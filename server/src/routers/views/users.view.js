import { Router } from "express";

const usersRouter = Router()
usersRouter.get("/",(req,res,next)=>{
    try {
        return res.render("users")
    } catch (error) {
        next(error)
    }
})

export default usersRouter