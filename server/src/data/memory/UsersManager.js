import crypto from "crypto"





class ProductManager {
    
    static #products = [];
    
    
    create(data) {
      if(!data.title) {
        console.log("faltan datos para crear el usuario!")
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo || "defaultphoto.jpg",
          title: data.title,
          category: data.category || "defaultcategory",
          price: data.price || 1,
          stock: data.stock || 1
        };
        ProductManager.#products.push(product);
        console.log("producto creado correctamente");
      }
      
    }
    read() {
      console.log(ProductManager.#products)
    }
    readOne(id) {
      const product = ProductManager.#products.find(each=> each.id === id);
      console.log(product);
    }
  }
  
  const gestorDeProductos = new ProductManager();
  
  gestorDeProductos.create({
    photo: "zapatilla.jpg",
    title: "zapatilla",
    category: "calzado",
    price: 120 ,
    stock: 500
  },
  )
 
  gestorDeProductos.read()

  