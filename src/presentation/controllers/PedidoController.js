/**
 * CAPA DE PRESENTACIÓN - Controlador de Pedidos
 * Responsabilidad: Maneja peticiones HTTP y respuestas
 * PROHIBIDO: Acceso directo a base de datos o lógica de negocio
 * Solo extrae datos de la petición y delega a la capa de servicios
 */

const pedidoService = require('../../services/PedidoService');

class PedidoController {

  crear(req, res) {
    const { clienteNombre, clienteEmail, items } = req.body;

    const resultado = pedidoService.crearPedido(clienteNombre, clienteEmail, items);

    if (!resultado.exito) {
      return res.status(400).json({
        mensaje: resultado.error || 'Error al crear el pedido',
        errores: resultado.errores
      });
    }

    res.status(201).json({
      mensaje: 'Pedido creado exitosamente',
      datos: resultado.datos
    });
  }

  obtenerTodos(req, res) {
    const pedidos = pedidoService.obtenerTodosLosPedidos();

    res.status(200).json({
      mensaje: 'Pedidos obtenidos exitosamente',
      total: pedidos.length,
      datos: pedidos
    });
  }

  obtenerPorId(req, res) {
    const { id } = req.params;

    const resultado = pedidoService.obtenerPedidoPorId(id);

    if (!resultado.exito) {
      return res.status(404).json({
        mensaje: resultado.error
      });
    }

    res.status(200).json({
      mensaje: 'Pedido encontrado',
      datos: resultado.datos
    });
  }

  actualizarEstado(req, res) {
    const { id } = req.params;
    const { estado } = req.body;

    const resultado = pedidoService.actualizarEstadoPedido(id, estado);

    if (!resultado.exito) {
      return res.status(400).json({
        mensaje: resultado.error
      });
    }

    res.status(200).json({
      mensaje: 'Estado del pedido actualizado exitosamente',
      datos: resultado.datos
    });
  }

  obtenerPorEstado(req, res) {
    const { estado } = req.params;

    const resultado = pedidoService.obtenerPedidosPorEstado(estado);

    if (!resultado.exito) {
      return res.status(400).json({
        mensaje: resultado.error
      });
    }

    res.status(200).json({
      mensaje: `Pedidos con estado ${estado}`,
      total: resultado.datos.length,
      datos: resultado.datos
    });
  }
}

module.exports = new PedidoController();
