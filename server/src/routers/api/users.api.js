import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.js";

const usersRouter = Router()

usersRouter.get("/", async(req,res,next) => {
    try {
        const allUsers = await usersManager.read();
        return res.json({
            statusCode: 200,
            response: allUsers,
            message: `${allUsers.length} usuario/s registrados actualmente`
        })

    } catch (error) {
        next(error)
    }
})
usersRouter.get("/:uid",async (req,res,next)=>{
    try {
        const {uid} = req.params;
        const one = await usersManager.readOne(uid)
        if(one) {
            return res.json({
                statusCode: 200,
                response: one
            })
        } else {
            const error = new Error ("Not Found");
            error.statusCode = 404;
            throw error
        }
        
    } catch (error) {
        next(error)
    }
})
usersRouter.post("/", create)
usersRouter.put("/:uid", update)
usersRouter.delete("/:uid", destroy)



async function create (req,res,next){
    try {
        const data = req.body;
        const one =  await usersManager.create(data);
        return res.json({
            statusCode: 201 ,
            message: `created!, id del usuario: ${one.id}`
        })

    } catch (error) {
        next(error)
    }
}
async function update (req,res,next) {
    try {
        const {uid} = req.params;
        const data = req.body;
        const one = await usersManager.update(uid,data);
        return res.json({
            statusCode: 200,
            response: one,
        })
    } catch (error) {    
        next(error)   
    }
}
async function destroy (req,res,next) {
    try {
        const {uid} = req.params;
        const one = await usersManager.destroyOne(uid);
        return res.json({
            statusCode: 200,
            response: one.removedUser,
            message: `usuario eliminado , ${one.q} usuarios en la base de datos`
        })
    } catch (error) {
        next(error)
    }
}
export default usersRouter
