/**
 * CAPA DE PRESENTACIÓN - Controlador de Artesanías
 * Responsabilidad: Maneja peticiones HTTP y respuestas
 * PROHIBIDO: Acceso directo a base de datos o lógica de negocio
 * Solo extrae datos de la petición y delega a la capa de servicios
 */

const artesaniaService = require('../../services/ArtesaniaService');

class ArtesaniaController {

  crear(req, res) {
    const { tipo, material, precio, stock, artesana } = req.body;

    const resultado = artesaniaService.crearArtesania(tipo, material, precio, stock, artesana);

    if (!resultado.exito) {
      return res.status(400).json({
        mensaje: 'Error al crear la artesanía',
        errores: resultado.errores
      });
    }

    res.status(201).json({
      mensaje: 'Artesanía creada exitosamente',
      datos: resultado.datos
    });
  }

  obtenerTodos(req, res) {
    const artesanias = artesaniaService.obtenerTodasLasArtesanias();

    res.status(200).json({
      mensaje: 'Artesanías obtenidas exitosamente',
      total: artesanias.length,
      datos: artesanias
    });
  }

  obtenerPorId(req, res) {
    const { id } = req.params;

    const resultado = artesaniaService.obtenerArtesaniaPorId(id);

    if (!resultado.exito) {
      return res.status(404).json({
        mensaje: resultado.error
      });
    }

    res.status(200).json({
      mensaje: 'Artesanía encontrada',
      datos: resultado.datos
    });
  }

  actualizar(req, res) {
    const { id } = req.params;
    const datos = req.body;

    const resultado = artesaniaService.actualizarArtesania(id, datos);

    if (!resultado.exito) {
      return res.status(400).json({
        mensaje: resultado.error || 'Error al actualizar la artesanía',
        errores: resultado.errores
      });
    }

    res.status(200).json({
      mensaje: 'Artesanía actualizada exitosamente',
      datos: resultado.datos
    });
  }

  eliminar(req, res) {
    const { id } = req.params;

    const resultado = artesaniaService.eliminarArtesania(id);

    if (!resultado.exito) {
      return res.status(404).json({
        mensaje: resultado.error
      });
    }

    res.status(200).json({
      mensaje: resultado.mensaje
    });
  }
}

module.exports = new ArtesaniaController();
