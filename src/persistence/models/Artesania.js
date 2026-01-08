/**
 * CAPA DE PERSISTENCIA - Modelo de Datos
 * Responsabilidad: Define la estructura de datos de una Artesanía
 * NO contiene lógica de negocio
 */

class Artesania {
  constructor(id, tipo, material, precio, stock, artesana) {
    this.id = id;
    this.tipo = tipo; // collares, aretes, manillas
    this.material = material;
    this.precio = precio;
    this.stock = stock;
    this.artesana = artesana;
    this.fechaCreacion = new Date();
  }
}

module.exports = Artesania;
