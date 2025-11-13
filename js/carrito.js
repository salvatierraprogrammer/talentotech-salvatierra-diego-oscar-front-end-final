import { obtenerCarrito } from "./storage.js";
import { eliminarDelCarrito, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  //Leemos cantidad de productos en carrito para mostrar
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  //Accedemos al nodo donde vamos a mostrar las tarjetas de producto
  const contenedor = document.getElementById("contenedor-carrito");
  // Botones de acciones
  const divAcciones = document.getElementById("acciones-carrito");

  //Esta lineas limpian los contenedor antes de renderizar tarjetas y botones
  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  //❌Si no hay productos en el carrito mostramos un mensaje
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "No hay productos en el carrito";
    contenedor.appendChild(mensaje);
    return; //⚠️salimos de la funcion para no intentar renderizar productos
  }

  //✅Si hay productos en el carrito los renderizamos
  //💡El forEach nos puede dar el indice del producto en el array
  carrito.forEach((producto, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-producto");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("btn-eliminar-carrito");

    //💡Aca nos sirve el indice, para poder pasarselo a la funcion de eliminar
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarDelCarrito(indice);

      //⚠️Importante! Volver a renderizar el carrito para actualizar la vista,
      // ya que sino quedaria con el producto eliminado porque solo borramos del storage
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  // 🔹 Calcular total del carrito
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  // 🔹 Mostrar total
  const totalTexto = document.createElement("p");
  totalTexto.classList.add("total-carrito");
  totalTexto.textContent = `Total: $${total}`;

  // 🔹 Botón Comprar
  const btnComprar = document.createElement("button");
  btnComprar.classList.add("btn", "btn-comprar");
  btnComprar.textContent = "Comprar 🛍️";
  btnComprar.addEventListener("click", () => {
    alert("Gracias por tu compra 🧡");
    vaciarCarrito();
    renderizarCarrito();
  });

  // 🔹 Botón Vaciar
  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn");
  btnVaciar.classList.add("btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();

    //⚠️Importante! Volver a renderizar el carrito para actualizar la vista,
    // ya que sino quedaria con los productos viejos porque solo borramos del storage
    renderizarCarrito();
  });

  // Agregar los elementos al contenedor de acciones
  divAcciones.appendChild(totalTexto);
  divAcciones.appendChild(btnComprar);
  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);
