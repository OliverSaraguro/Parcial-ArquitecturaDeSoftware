/**
 * CAPA DE PERSISTENCIA - Modelo de Datos
 * Responsabilidad: Define la estructura de datos de una Feria
 * NO contiene lógica de negocio
 */

class Feria {
  constructor(id, nombre, ubicacion, fecha, productosDestacados) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.fecha = fecha;
    this.productosDestacados = productosDestacados; // Array de artesaniaIds
    this.fechaCreacion = new Date();
  }
}

module.exports = Feria;
