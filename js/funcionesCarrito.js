import {guardarCarrito, obtenerCarrito, vaciarCarritoStorage} from './storage.js';
import {actualizarContador, mostrarMensaje} from "./ui.js"

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();

    carrito.push(producto);
    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje(`Se agregó ${producto.nombre} al carrito.`);

}
export const eliminarDelCarrito = (indice) => {
    const carrito = obtenerCarrito();
    carrito.splice(indice, 1)
    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje(`Producto eliminado del carrito.`);

}
export const vaciarCarrito = () => {
    vaciarCarritoStorage();
    actualizarContador([]);
    mostrarMensaje(`El carrito ha sido vaciado.`);
}