/**
 * CAPA DE PERSISTENCIA - Repositorio
 * Responsabilidad: Gestiona el acceso a datos (CRUD) de Artesanías
 * Fuente de datos: Array en memoria (simula base de datos)
 * NO contiene lógica de negocio
 */

const Artesania = require('../models/Artesania');

class ArtesaniaRepository {
  constructor() {
    this.artesanias = [];
    this.nextId = 1;
    this.inicializarDatos();
  }

  inicializarDatos() {
    // Datos de ejemplo para demostración
    this.crear('collares', 'Plata y cuentas', 25.50, 10, 'María Gualán');
    this.crear('aretes', 'Semillas naturales', 12.00, 15, 'Rosa Lozano');
    this.crear('manillas', 'Lana de alpaca', 18.75, 8, 'Carmen Quizhpe');
  }

  crear(tipo, material, precio, stock, artesana) {
    const artesania = new Artesania(this.nextId++, tipo, material, precio, stock, artesana);
    this.artesanias.push(artesania);
    return artesania;
  }

  obtenerTodos() {
    return [...this.artesanias];
  }

  obtenerPorId(id) {
    return this.artesanias.find(a => a.id === parseInt(id));
  }

  actualizar(id, datos) {
    const index = this.artesanias.findIndex(a => a.id === parseInt(id));
    if (index === -1) return null;

    this.artesanias[index] = {
      ...this.artesanias[index],
      ...datos,
      id: parseInt(id)
    };
    return this.artesanias[index];
  }

  eliminar(id) {
    const index = this.artesanias.findIndex(a => a.id === parseInt(id));
    if (index === -1) return false;

    this.artesanias.splice(index, 1);
    return true;
  }

  actualizarStock(id, nuevoStock) {
    const artesania = this.obtenerPorId(id);
    if (!artesania) return null;

    artesania.stock = nuevoStock;
    return artesania;
  }
}

module.exports = new ArtesaniaRepository();
