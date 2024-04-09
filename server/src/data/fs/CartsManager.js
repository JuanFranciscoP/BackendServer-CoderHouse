import fs from "fs";
import crypto from "crypto"

class CartsManager {
  constructor() {
    this.path = "./src/data/fs/files/carts.json";
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
        console.log("gestor de carts creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async create(data) {
    try {
      if (!data.title || !data.category) {
          const error = new Error ("faltan datos para agregar el producto");
          throw error
      } else {
        const product = {
          photo: data.photo || "random.jpg",
          title: data.title,
          stock: data.stock || "ilimitado",
          price: data.price || "lo que puedas pagar $",
          category: data.category,
          id: crypto.randomBytes(12).toString("hex")
        };
  
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return product
      }
    } catch (error) {
      throw error
    }
    
  }
  async read() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      if (products.length > 0) {
        console.log(products);
        return products
      } else {
        console.log("sin productos en el listado");
      }
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
      let product = products.find((each)=> each.id === id);
      console.log(product)
      if (product) {
        let filteredProducts = products.filter((each)=> each.id !== id);
        filteredProducts = JSON.stringify(filteredProducts, null, 2);
        await fs.promises.writeFile(this.path, filteredProducts);
        return product
      } else {
        const error = new Error ("product not found!");
        error.statusCode = 404;
        throw error
      }
    } catch (error) {
      throw error;
    }
  }
  async update(id,data){
    try {
      let products = await this.read();
      let one = products.find(each=>each.id===id);
      if(one) {
        for (let prop in data) {
          one[prop] = data[prop]
        }
        products = JSON.stringify(products,null,2);
        await fs.promises.writeFile(this.path,products)
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
}