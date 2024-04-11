import crypto from "crypto";


class ProductManager {
    static #products = [];
    create(data) {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: data.photo,
        title: data.title,
        category: data.category,
        price: data.price,
        stock: data.stock
      };
       ProductManager.#products.push(product);
      console.log("producto creado correctamente");
    }
    read() {
      console.log(ProductManager.#products)
    }
  }
  
  const gestorDeProductos = new ProductManager();
  
  // gestorDeProductos.create({
  //   photo: "zapatilla.jpg",
  //   title: "zapatilla",
  //   category: "calzado",
  //   price: 120 ,
  //   stock: 500
  // });
  gestorDeProductos.create({
    photo: "buzo.jpg",
    title: "canguro xl",
    category: "abrigos",
    price: 300 ,
    stock: 10
  })
  gestorDeProductos.read()
  