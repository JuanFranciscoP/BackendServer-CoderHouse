class ProductManager {
    static #products = [];
    create(data) {
      const product = {
        id:
          ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
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
  
  gestorDeProductos.create({
    photo: "zapatilla.jpg",
    title: "zapatilla",
    category: "calzado",
    price: 120 ,
    stock: 500
  });
  
  gestorDeProductos.read()
  