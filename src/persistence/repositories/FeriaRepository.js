/**
 * CAPA DE PERSISTENCIA - Repositorio
 * Responsabilidad: Gestiona el acceso a datos (CRUD) de Ferias
 * Fuente de datos: Array en memoria (simula base de datos)
 * NO contiene lógica de negocio
 */

const Feria = require('../models/Feria');

class FeriaRepository {
  constructor() {
    this.ferias = [];
    this.nextId = 1;
    this.inicializarDatos();
  }

  inicializarDatos() {
    // Datos de ejemplo para demostración
    this.crear(
      'Feria de Artesanías Saraguro 2026',
      'Plaza Central de Saraguro',
      new Date('2026-02-15'),
      [1, 2]
    );
  }

  crear(nombre, ubicacion, fecha, productosDestacados) {
    const feria = new Feria(this.nextId++, nombre, ubicacion, fecha, productosDestacados);
    this.ferias.push(feria);
    return feria;
  }

  obtenerTodos() {
    return [...this.ferias];
  }

  obtenerPorId(id) {
    return this.ferias.find(f => f.id === parseInt(id));
  }

  actualizar(id, datos) {
    const index = this.ferias.findIndex(f => f.id === parseInt(id));
    if (index === -1) return null;

    this.ferias[index] = {
      ...this.ferias[index],
      ...datos,
      id: parseInt(id)
    };
    return this.ferias[index];
  }

  eliminar(id) {
    const index = this.ferias.findIndex(f => f.id === parseInt(id));
    if (index === -1) return false;

    this.ferias.splice(index, 1);
    return true;
  }

  agregarProductoDestacado(id, artesaniaId) {
    const feria = this.obtenerPorId(id);
    if (!feria) return null;

    if (!feria.productosDestacados.includes(artesaniaId)) {
      feria.productosDestacados.push(artesaniaId);
    }
    return feria;
  }
}

module.exports = new FeriaRepository();
