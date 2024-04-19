

const productList = document.querySelector("#productList");
const completeList = document.querySelector("#completeList");
const productosLimpieza = document.querySelector("#limpieza");
const productosAlmacen = document.querySelector("#almacen");
const listadoCarrito = document.querySelector("#carrito");
const cart = document.querySelector(".modal-body");
const btnCompra = document.querySelector(".btn-compra");


let carrito = JSON.parse(localStorage.getItem("carro")) || [];

let listado;

const obtenerProductos = async () => {
    const resp = await fetch("db/productos.json");
    const data = await resp.json();
    
    listado = data;

    verProductos(listado);
    mostrarCarrito();
}






//modificando la funcion agregar producto para que en vez de copiar los productos, desestructure los mismos para obtener un objeto nuevo antes de pushearlo en el array de carrito


const agregarProducto = (item) => {
    const {id,articulo,precio} = item;
    let producto = {
        id:id,
        articulo:articulo,
        precio:precio,
        cantidad:1
    }

    if(carrito.some(producto => producto.articulo === articulo)){
        const index = carrito.findIndex(producto => producto.articulo === articulo);
        carrito[index].cantidad ++;
    } else {
        carrito = [...carrito,producto];
    }
    console.log(carrito);
    localStorage.setItem("carro", JSON.stringify(carrito));
    
    mostrarCarrito();
}



const verProductos = (listado) => {
    

    listado.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("div-list");
        let li = document.createElement("li");
        li.classList.add("fw-normal");
        li.innerHTML = `${producto.articulo} - $ ${producto.precio}`;

        let btnAgregar = document.createElement("button");
        btnAgregar.classList.add("btn","btn-success","btn-sm");
        btnAgregar.innerHTML = "Agregar Producto";



        div.appendChild(li);
        div.appendChild(btnAgregar);

        productList.appendChild(div);

        btnAgregar.onclick = () => {
            Toastify({
                text: "Producto agregado",
                className: "info",
                style: {
                background: "linear-gradient(to right)",
                
                }
            }).showToast();
            agregarProducto(producto);
        }

    });

}



const mostrarCarrito = () => {

    const total = carrito.reduce((total, producto) => total + producto.precio*producto.cantidad, 0);
    if (carrito.length > 0) {
        
        cart.innerHTML = " ";
        
        let divCarrito = document.createElement("div");
        divCarrito.classList.add("contenedor-carrito");
        cart.appendChild(divCarrito);
        carrito.forEach((producto, index) => {

            let divProducto = document.createElement("div");
            divProducto.classList.add("div-producto");


            let productoNombre = document.createElement("li")
            if(producto.cantidad > 1){
                productoNombre.innerText = `${producto.articulo} ---x${producto.cantidad}`
            } else {
                productoNombre.innerHTML = producto.articulo;
            }
            
            divProducto.appendChild(productoNombre);

            let btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-secondary", "--bs-info");
            btnEliminar.innerHTML = "Eliminar Producto";

            btnEliminar.onclick = () => {
                if(producto.cantidad > 1){
                    producto.cantidad --;
                }else {
                    carrito.splice(index, 1);
                }
                Toastify({
                    text: "Producto Eliminado",
                    className: "info",
                    style: {
                    background: "linear-gradient(to right)",
                    
                    }
                }).showToast();
                localStorage.setItem("carro", JSON.stringify(carrito));
                mostrarCarrito();
            };
            divProducto.appendChild(btnEliminar);
            cart.appendChild(divProducto);
        })

        let resumenCarrito = document.createElement("div");

        resumenCarrito.classList.add("total-carrito");
        

        let totalCarrito = document.createElement("p");
        totalCarrito.classList.add("m-auto")
        totalCarrito.innerText = ` Total: $ ${total}`;
        resumenCarrito.appendChild(totalCarrito);

        cart.appendChild(resumenCarrito);

        
        
    } else {
        cart.innerText = "ups, parece que no has agregado nada al carro";
    }


}


//eventos
cart.onclick = () => {
    mostrarCarrito();
}


completeList.onclick = () => {
    productList.innerHTML = " ";
    verProductos(listado);
}

productosLimpieza.onclick = () => {
    productList.innerHTML = " ";
    let listadoLimpieza = listado.filter(producto => producto.seccion.toLowerCase() === "limpieza");
    verProductos(listadoLimpieza);
}

productosAlmacen.onclick = () => {
    productList.innerHTML = " ";
    let listadoAlmacen = listado.filter(producto => producto.seccion.toLowerCase() === "almacen");
    verProductos(listadoAlmacen);
    localStorage.setItem("soloAlmacen", JSON.stringify(listadoAlmacen));
}

btnCompra.onclick = () => {
    
    if(carrito.length > 0){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Gracias por Su Compra!',
            showConfirmButton: false,
            timer: 3000})
    
            carrito = [];
            localStorage.setItem("carro", JSON.stringify(carrito));
            mostrarCarrito();
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No ha agregado ningun item al carrito!',
            showConfirmButton: false,
            timer: 3000})
    }
    
}





obtenerProductos();

