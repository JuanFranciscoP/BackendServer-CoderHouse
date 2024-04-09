import fs from"fs";
import crypto from "crypto";

class UsersManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
    this.init();
  }
  init() {
    try {
      const exist = fs.existsSync(this.path);
      if (!exist) {
        const stringData = JSON.stringify([], null, 2);
        fs.writeFile(this.path, stringData, (err) => {
          console.log(err);
        });
      } else {
        console.log("lista de usuarios ya creada");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async create(data) {
    try {
      if (!data.email || !data.password) {
        const error = new Error ("faltan datos, revise la informacion necesaria para crear el usuario");
        error.statusCode = 401
        throw error
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo || "default-photo.jpg",
          email: data.email,
          password: data.password,
          role: data.role || 0,
          signUpDate: new Date
        };
  
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        return user
      }
    } catch (error) {
      throw error;
    }
      
  }
  async read(role) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      if (!role) {
        if(users.length === 0){
        const error = new Error("sin usuarios registrados!");
        error.statusCode = 404;
        throw error}
        return users
      }
      const filteredUsers = users.filter(each=>each.role === parseInt(role))
          
      if(filteredUsers.length === 0){
        const error = new Error("no hay usuarios registrados con este rol!");
        error.statusCode = 404;
        throw error
      }
    return filteredUsers

    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const filteredUser = users.find((each) => each.id === id);
      if (!filteredUser) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error
      } else {
        return filteredUser;
      }
    } catch (error) {
      throw error;
    }
  }
  async update(id,data){
    try {
      let users = await this.read();
      let one = users.find(each=>each.id===id);
      if(one) {
        for (let prop in data) {
          one[prop] = data[prop]
        }
        one = {
          ...one,
          lastModification: new Date
        }
        users = JSON.stringify(users,null,2);
        await fs.promises.writeFile(this.path,users)
        return one; 
      } else {
        const error = new Error('NOT FOUND');
        error.statusCode = 404;
        throw error
      }
      
    } catch (error) {
      throw error
    }
  }


  async destroyOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const removedUser = users.find(each => each.id === id)
      if (!removedUser) {
        const error = new Error("usuario no encontrado en la base de datos");
        error.statusCode = 404;
        throw error
      } else {
        let filteredUsers = users.filter((each) => each.id !== id);
        const q = filteredUsers.length;
        filteredUsers = JSON.stringify(filteredUsers, null, 2);
        await fs.promises.writeFile(this.path, filteredUsers);
        const result = {
          removedUser,
          q
        }
        return result
      }
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  const users1 = new UsersManager();
   await users1.create({
     email: "asd@gmail.com",
     role: "user",
     password: "batocongotas",
   });
   await users1.create({
     email: "asereje@gmail.com",
     role: "admin",
     password: "abarajamelabaniera",
   });
    await users1.readOne("fd6649fdce3e8b");
    await users1.read();
}

const usersManager = new UsersManager();
export default usersManager