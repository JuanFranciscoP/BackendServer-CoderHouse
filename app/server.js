import express from "express";
import usersManager from "./data/fs/UsersManager.js";
import productsManager from "./data/fs/ProductsManager.js";


const server = express();
const port = 8080;
const ready = ()=> console.log(`server ready on port ${port}`);

server.listen(port,ready);

server.use(express.urlencoded({extended: true}));




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

server.get("/api/products/:pid", async(req,res)=> {
    try {
        const {pid} = req.params;
        const one = await productsManager.readOne(pid);
        if(one){
            return res.status(201).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
        
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
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
