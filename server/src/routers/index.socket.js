import usersManager from "../data/fs/UsersManager.fs.js";
import productsManager from "../data/fs/ProductsManager.fs.js";


export default async (socket)=> {
    console.log(`client id:  ${socket.id} connected`);
    socket.emit("products", await productsManager.read())
    socket.on("register", async data =>{
        await productsManager.create(data)
        socket.emit("products", await productsManager.read())
    })            
}