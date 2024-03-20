//falta hacer los cambios para que el gestor de productos difiera del de usuarios. y funcione correctamente

const fs = require("fs");
const crypto = require("crypto");

class ProductsManager {
  constructor() {
    this.path = "./app/fs/files/products.json";
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
        console.log("gestor de productos ya creado");
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

      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      products.push(user);
      products = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, products);
    }
  }
  async read() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      if (products.length > 0) {
        console.log(products);
      } else {
        console.log("lista de usuarios vacia");
      }
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filteredUser = products.find((each) => each.id === id);
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
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      filteredproducts = products.filter((each) => each.id !== id);
      if (filteredproducts.length === products.length) {
        console.log("usuario no encontrado en la base de datos");
      } else {
        products = filteredproducts;
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        console.log("usuario eliminado");
      }
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  const products1 = new productsManager();
   await products1.create({
     email: "asd@gmail.com",
     role: "user",
     password: "batocongotas",
   });
   await products1.create({
     email: "asereje@gmail.com",
     role: "admin",
     password: "abarajamelabaniera",
   });
    await products1.readOne("fd6649fdce3e8b");
    await products1.read();
}

test();