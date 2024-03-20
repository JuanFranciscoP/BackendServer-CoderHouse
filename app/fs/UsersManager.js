//crear condicionales en los metodos de la clase para el caso de no encontrar el id//

const fs = require("fs");
const crypto = require("crypto");

class UsersManager {
  constructor() {
    this.path = "./app/fs/files/users.json";
    this.init();
  }
  init() {
    try {
      const exist = fs.existsSync(this.path);
      console.log(exist);
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
    } catch (error) {}
    if (!data.email || !data.password || !data.role) {
      console.log(
        "faltan datos, revise la informacion necesaria para crear el usuario"
      );
    } else {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: data.photo,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users.push(user);
      users = JSON.stringify(users, null, 2);
      await fs.promises.writeFile(this.path, users);
    }
  }
  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users;
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
        console.log("usuario no encontrado");
      } else {
        console.log(filteredUser);
      }
    } catch (error) {
      throw error;
    }
  }
  async destroyOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      filteredUsers = users.filter((each) => each.id !== id);
      if (filteredUsers.length === users.length) {
        console.log("usuario no encontrado en la base de datos");
      } else {
        users = filteredUsers;
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        console.log("usuario eliminado");
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
  role: "JEFE",
  password: "batocongotas"
  })
  await users1.readOne("fd6649fdce3e8b");
}

test();
