import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
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
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "https://www.feed-image-editor.com/sites/default/files/perm/wysiwyg/image_not_available.png",
        stock: data.stock || 1,
        price: data.price || 1,
        category: data.category || "defaultCategory",
      };

      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      products.push(product);
      products = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, products);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async read(cat) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      if (!cat) {
        if (products.length === 0) {
          const error = new Error("no hay productos en el listado");
          error.statusCode = 404;
          throw error;
        }
        return products;
      }
      const filteredProducts = products.filter((each) => each.category === cat);
      if (filteredProducts.length === 0) {
        const error = new Error("no hay productos de esta categoria!");
        error.statusCode = 404;
        throw error;
      }
      return filteredProducts;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filteredProduct = products.find((each) => each.id === id);
      if (!filteredProduct) {
        console.log("producto no encontrado");
      } else {
        return filteredProduct;
        console.log(filteredProduct);
      }
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      let product = products.find((each) => each.id === id);
      if (product) {
        let filteredProducts = products.filter((each) => each.id !== id);
        filteredProducts = JSON.stringify(filteredProducts, null, 2);
        await fs.promises.writeFile(this.path, filteredProducts);
        return product;
      } else {
        const error = new Error("product not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      let products = await this.read();
      let one = products.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return one;
      } else {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
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

const productsManager = new ProductsManager();
export default productsManager;
