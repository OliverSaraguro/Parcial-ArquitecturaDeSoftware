/**
 * CAPA DE PRESENTACIÓN - Controlador de Ferias
 * Responsabilidad: Maneja peticiones HTTP y respuestas
 * PROHIBIDO: Acceso directo a base de datos o lógica de negocio
 * Solo extrae datos de la petición y delega a la capa de servicios
 */

const feriaService = require('../../services/FeriaService');

class FeriaController {

  crear(req, res) {
    const { nombre, ubicacion, fecha, productosDestacados } = req.body;

    const resultado = feriaService.crearFeria(nombre, ubicacion, fecha, productosDestacados);

    if (!resultado.exito) {
      return res.status(400).json({
        mensaje: resultado.error || 'Error al crear la feria',
        errores: resultado.errores
      });
    }

    res.status(201).json({
      mensaje: 'Feria creada exitosamente',
      datos: resultado.datos
    });
  }

  obtenerTodos(req, res) {
    const ferias = feriaService.obtenerTodasLasFerias();

    res.status(200).json({
      mensaje: 'Ferias obtenidas exitosamente',
      total: ferias.length,
      datos: ferias
    });
  }

  obtenerPorId(req, res) {
    const { id } = req.params;

    const resultado = feriaService.obtenerFeriaConProductosDestacados(id);

    if (!resultado.exito) {
      return res.status(404).json({
        mensaje: resultado.error
      });
    }

    res.status(200).json({
      mensaje: 'Feria encontrada',
      datos: resultado.datos
    });
  }

  actualizar(req, res) {
    const { id } = req.params;
    const datos = req.body;

    const resultado = feriaService.actualizarFeria(id, datos);

    if (!resultado.exito) {
      return res.status(400).json({
        mensaje: resultado.error || 'Error al actualizar la feria',
        errores: resultado.errores
      });
    }

    res.status(200).json({
      mensaje: 'Feria actualizada exitosamente',
      datos: resultado.datos
    });
  }

  eliminar(req, res) {
    const { id } = req.params;

    const resultado = feriaService.eliminarFeria(id);

    if (!resultado.exito) {
      return res.status(404).json({
        mensaje: resultado.error
      });
    }

    res.status(200).json({
      mensaje: resultado.mensaje
    });
  }

  agregarProductoDestacado(req, res) {
    const { id } = req.params;
    const { artesaniaId } = req.body;

    const resultado = feriaService.agregarProductoDestacado(id, artesaniaId);

    if (!resultado.exito) {
      return res.status(400).json({
        mensaje: resultado.error
      });
    }

    res.status(200).json({
      mensaje: 'Producto destacado agregado exitosamente',
      datos: resultado.datos
    });
  }
}

module.exports = new FeriaController();
