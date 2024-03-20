//falta hacer los cambios para que el gestor de productos difiera del de usuarios. y funcione correctamente

const fs = require("fs");

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
    if (!data.price || !data.stock || !data.photo) {
      console.log(
        "faltan datos, revise la informacion necesaria para crear el producto"
      );
    } else {
      const product = {
        photo: data.photo,
        title: data.title,
        stock: data.stock,
        price: data.price,
      };

      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      products.push(product);
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
        console.log("sin productos en el listado");
      }
    } catch (error) {
      throw error;
    }
  }
  async readOne(title) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filteredProduct = products.find((each) => each.title === title);
      if (!filteredProduct) {
        console.log("producto no encontrado");
      } else {
        console.log(filteredProduct);
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
        console.log("producto no encontrado en la base de datos");
      } else {
        products = filteredproducts;
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        console.log("producto eliminado");
      }
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  const products1 = new ProductsManager();
   await products1.create({
    title: "nike airforce",
     stock: 500,
     photo: "zapatilla.jpg",
     price: 150,
   });
   await products1.create({
    title: "adidas classic",
    stock: 400,
    photo: "zapatilla2.jpg",
    price: 120,
   });
    await products1.readOne("nike airforce");
    //await products1.read();
}

test();