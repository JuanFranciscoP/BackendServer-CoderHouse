import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.js";
import __dirname from "../../../utils.js";

const productsRouter = Router()


productsRouter.get("/", async (req,res,next)=>{
    try {
        console.log(__dirname+'/src/views')
        const {category} = req.query;
        const allProducts = await productsManager.read(category);
        return res.json({ 
            response: allProducts,
            category: category? category : "Todos los productos",
            statusCode: 200,
            message: `${allProducts.length} productos en el listado`
        })
    } catch (error) {
        next(error)
    }
})
productsRouter.get("/:nid",async (req,res,next)=>{
    try {
        const {nid} = req.params;
        const one = await productsManager.readOne(nid)
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
productsRouter.delete("/:pid", destroy)
productsRouter.post("/", create);
productsRouter.put("/:pid", update);

async function create (req,res,next){
    try {
        const data = req.body;
        const one =  await productsManager.create(data);
        return res.json({
            statusCode: 201 ,
            message: `created!, id del producto: ${one.id}`
        })

    } catch (error) {
        next(error)
    }
}

async function update (req,res,next) {
    try {
        const {pid} = req.params;
        const data = req.body;
        const one = await productsManager.update(pid,data);
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
        const {pid} = req.params;
        const one = await productsManager.destroy(pid);
        return res.json({
            statusCode: 200,
            response: one,
            message: "producto eliminado correctamente"
        })
    } catch (error) {
        next(error)
    }
}


export default productsRouter