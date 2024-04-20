import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js";

const usersRouter = Router()
usersRouter.get("/",(req,res,next)=>{
    try {
        return res.render("users")
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/:uid", async (req,res,next)=>{
    try {
        const {uid} = req.params;
        const one = await usersManager.readOne(uid)
        return res.render("user", {one} )
    } catch (error) {
        next(error)
    }
})

export default usersRouter