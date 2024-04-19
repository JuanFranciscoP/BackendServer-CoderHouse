import express from "express";
import usersManager from "./data/fs/UsersManager.js";
import productsManager from "./data/fs/ProductsManager.js";


const server = express();
const port = 8080;
const ready = ()=> console.log(`server ready on port ${port}`);

server.listen(port,ready);

server.use(express.urlencoded({extended: true}));
server.use(express.json());



//router
server.get("/", async(req,res)=>{
        try {
            return res.status(200).json({
                response: "Coder Api",
                success: true
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                response: "Coder Api Error",
                success: false

            })
        }
})


//endpoints para ProductsManager

const create = async(req,res)=>{
    try {
        const data = req.body;
        const one =  await productsManager.create(data);
        return res.json({
            statusCode: 201 ,
            message: `created!, id del producto: ${one.id}`
        })

    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "CODER API ERROR"
        })
    }
}

const update = async(req,res)=>{
    try {
        const {nid} = req.params;
        const data = req.body;
        const one = await productsManager.update(nid,data);
        return res.json({
            statusCode: 200,
            response: one,
            message:"producto modificado correctamente"
        })
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "CODER API ERROR"
        })
    }
}
server.post("/api/products", create);
server.put("/api/products/:nid", update);

server.get("/api/products/:title/:category", async(req,res)=> {
    try {
        const {title, category} = req.params;
        const data = {title, category};
        const one = await productsManager.create(data);
        return res.status(201).json({
            response: {title, category},
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "error",
            success: false
        })
    }
})

server.get("/api/products", async (req,res)=>{
    try {
        const allProducts = await productsManager.read();
        const {category} = req.query;
        return res.status(200).json({ 
            response: allProducts,
            category,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            response: "error",
            success: false
        })
    }
})




//endpoints para UsersManager

server.get("/api/products/:userEmail/:userPass", async(req,res)=> {
    try {
        const {userEmail, userPass} = req.params;
        const data = {userEmail, userPass};
        const one = await productsManager.create(data);
        return res.status(201).json({
            response: {userEmail, userPass},
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "error",
            success: false
        })
    }
})
