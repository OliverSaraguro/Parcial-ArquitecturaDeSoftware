/**
 * CAPA DE LÓGICA DE NEGOCIO - Servicio de Pedidos
 * Responsabilidad: Validaciones, cálculo de totales, gestión de estados y stock
 * NO conoce HTTP ni acceso directo a base de datos
 * Interactúa con repositorios y otros servicios
 */

const pedidoRepository = require('../persistence/repositories/PedidoRepository');
const artesaniaService = require('./ArtesaniaService');

class PedidoService {

  validarDatosCliente(clienteNombre, clienteEmail) {
    const errores = [];

    if (!clienteNombre || clienteNombre.trim().length < 3) {
      errores.push('El nombre del cliente debe tener al menos 3 caracteres');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clienteEmail || !emailRegex.test(clienteEmail)) {
      errores.push('El email del cliente no es válido');
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  validarItems(items) {
    const errores = [];

    if (!items || !Array.isArray(items) || items.length === 0) {
      errores.push('El pedido debe contener al menos un item');
      return { valido: false, errores };
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.artesaniaId) {
        errores.push(`Item ${i + 1}: falta el ID de la artesanía`);
      }

      if (!item.cantidad || item.cantidad <= 0) {
        errores.push(`Item ${i + 1}: la cantidad debe ser mayor a 0`);
      }
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  calcularTotalPedido(items) {
    let total = 0;
    const itemsConPrecio = [];

    for (const item of items) {
      const resultado = artesaniaService.obtenerArtesaniaPorId(item.artesaniaId);

      if (!resultado.exito) {
        return {
          exito: false,
          error: `Artesanía con ID ${item.artesaniaId} no encontrada`
        };
      }

      const artesania = resultado.datos;
      const verificacion = artesaniaService.verificarDisponibilidadStock(
        item.artesaniaId,
        item.cantidad
      );

      if (!verificacion.disponible) {
        return {
          exito: false,
          error: verificacion.error
        };
      }

      const subtotal = artesania.precio * item.cantidad;
      total += subtotal;

      itemsConPrecio.push({
        artesaniaId: item.artesaniaId,
        cantidad: item.cantidad,
        precioUnitario: artesania.precio,
        subtotal
      });
    }

    return {
      exito: true,
      total: parseFloat(total.toFixed(2)),
      items: itemsConPrecio
    };
  }

  crearPedido(clienteNombre, clienteEmail, items) {
    const validacionCliente = this.validarDatosCliente(clienteNombre, clienteEmail);
    if (!validacionCliente.valido) {
      return {
        exito: false,
        errores: validacionCliente.errores
      };
    }

    const validacionItems = this.validarItems(items);
    if (!validacionItems.valido) {
      return {
        exito: false,
        errores: validacionItems.errores
      };
    }

    const calculoTotal = this.calcularTotalPedido(items);
    if (!calculoTotal.exito) {
      return {
        exito: false,
        error: calculoTotal.error
      };
    }

    for (const item of calculoTotal.items) {
      artesaniaService.reducirStock(item.artesaniaId, item.cantidad);
    }

    const pedido = pedidoRepository.crear(
      clienteNombre.trim(),
      clienteEmail.trim(),
      calculoTotal.items,
      calculoTotal.total,
      'Pendiente'
    );

    return {
      exito: true,
      datos: pedido
    };
  }

  obtenerTodosLosPedidos() {
    return pedidoRepository.obtenerTodos();
  }

  obtenerPedidoPorId(id) {
    const pedido = pedidoRepository.obtenerPorId(id);

    if (!pedido) {
      return {
        exito: false,
        error: 'Pedido no encontrado'
      };
    }

    return {
      exito: true,
      datos: pedido
    };
  }

  actualizarEstadoPedido(id, nuevoEstado) {
    const estadosValidos = ['Pendiente', 'Enviado', 'Entregado'];

    if (!estadosValidos.includes(nuevoEstado)) {
      return {
        exito: false,
        error: 'Estado inválido. Estados válidos: Pendiente, Enviado, Entregado'
      };
    }

    const pedido = pedidoRepository.obtenerPorId(id);
    if (!pedido) {
      return {
        exito: false,
        error: 'Pedido no encontrado'
      };
    }

    const validacionTransicion = this.validarTransicionEstado(pedido.estado, nuevoEstado);
    if (!validacionTransicion.valida) {
      return {
        exito: false,
        error: validacionTransicion.error
      };
    }

    const pedidoActualizado = pedidoRepository.actualizarEstado(id, nuevoEstado);

    return {
      exito: true,
      datos: pedidoActualizado
    };
  }

  validarTransicionEstado(estadoActual, nuevoEstado) {
    const transicionesValidas = {
      'Pendiente': ['Enviado', 'Pendiente'],
      'Enviado': ['Entregado', 'Enviado'],
      'Entregado': ['Entregado']
    };

    if (!transicionesValidas[estadoActual].includes(nuevoEstado)) {
      return {
        valida: false,
        error: `No se puede cambiar de ${estadoActual} a ${nuevoEstado}`
      };
    }

    return { valida: true };
  }

  obtenerPedidosPorEstado(estado) {
    const estadosValidos = ['Pendiente', 'Enviado', 'Entregado'];

    if (!estadosValidos.includes(estado)) {
      return {
        exito: false,
        error: 'Estado inválido'
      };
    }

    const pedidos = pedidoRepository.obtenerPorEstado(estado);

    return {
      exito: true,
      datos: pedidos
    };
  }
}

module.exports = new PedidoService();
