/**
 * CAPA DE PERSISTENCIA - Modelo de Datos
 * Responsabilidad: Define la estructura de datos de un Pedido
 * NO contiene lógica de negocio
 */

class Pedido {
  constructor(id, clienteNombre, clienteEmail, items, total, estado = 'Pendiente') {
    this.id = id;
    this.clienteNombre = clienteNombre;
    this.clienteEmail = clienteEmail;
    this.items = items; // Array de {artesaniaId, cantidad, precioUnitario}
    this.total = total;
    this.estado = estado; // Pendiente, Enviado, Entregado
    this.fechaPedido = new Date();
  }
}

module.exports = Pedido;
