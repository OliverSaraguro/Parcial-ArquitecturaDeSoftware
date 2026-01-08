/**
 * CAPA DE PERSISTENCIA - Repositorio
 * Responsabilidad: Gestiona el acceso a datos (CRUD) de Pedidos
 * Fuente de datos: Array en memoria (simula base de datos)
 * NO contiene lógica de negocio
 */

const Pedido = require('../models/Pedido');

class PedidoRepository {
  constructor() {
    this.pedidos = [];
    this.nextId = 1;
  }

  crear(clienteNombre, clienteEmail, items, total, estado) {
    const pedido = new Pedido(this.nextId++, clienteNombre, clienteEmail, items, total, estado);
    this.pedidos.push(pedido);
    return pedido;
  }

  obtenerTodos() {
    return [...this.pedidos];
  }

  obtenerPorId(id) {
    return this.pedidos.find(p => p.id === parseInt(id));
  }

  actualizarEstado(id, nuevoEstado) {
    const pedido = this.obtenerPorId(id);
    if (!pedido) return null;

    pedido.estado = nuevoEstado;
    return pedido;
  }

  obtenerPorEstado(estado) {
    return this.pedidos.filter(p => p.estado === estado);
  }
}

module.exports = new PedidoRepository();
