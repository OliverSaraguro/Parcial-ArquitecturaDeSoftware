/**
 * CAPA DE LÓGICA DE NEGOCIO - Servicio de Ferias
 * Responsabilidad: Validaciones y reglas de negocio de ferias y promociones
 * NO conoce HTTP ni acceso directo a base de datos
 * Interactúa con repositorios y otros servicios
 */

const feriaRepository = require('../persistence/repositories/FeriaRepository');
const artesaniaService = require('./ArtesaniaService');

class FeriaService {

  validarDatosFeria(nombre, ubicacion, fecha) {
    const errores = [];

    if (!nombre || nombre.trim().length < 5) {
      errores.push('El nombre de la feria debe tener al menos 5 caracteres');
    }

    if (!ubicacion || ubicacion.trim().length < 5) {
      errores.push('La ubicación debe tener al menos 5 caracteres');
    }

    const fechaObj = new Date(fecha);
    if (!fecha || isNaN(fechaObj.getTime())) {
      errores.push('La fecha no es válida');
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  crearFeria(nombre, ubicacion, fecha, productosDestacados = []) {
    const validacion = this.validarDatosFeria(nombre, ubicacion, fecha);

    if (!validacion.valido) {
      return {
        exito: false,
        errores: validacion.errores
      };
    }

    if (productosDestacados.length > 0) {
      for (const artesaniaId of productosDestacados) {
        const resultado = artesaniaService.obtenerArtesaniaPorId(artesaniaId);
        if (!resultado.exito) {
          return {
            exito: false,
            error: `Artesanía con ID ${artesaniaId} no encontrada`
          };
        }
      }
    }

    const feria = feriaRepository.crear(
      nombre.trim(),
      ubicacion.trim(),
      new Date(fecha),
      productosDestacados
    );

    return {
      exito: true,
      datos: feria
    };
  }

  obtenerTodasLasFerias() {
    return feriaRepository.obtenerTodos();
  }

  obtenerFeriaPorId(id) {
    const feria = feriaRepository.obtenerPorId(id);

    if (!feria) {
      return {
        exito: false,
        error: 'Feria no encontrada'
      };
    }

    return {
      exito: true,
      datos: feria
    };
  }

  obtenerFeriaConProductosDestacados(id) {
    const resultado = this.obtenerFeriaPorId(id);

    if (!resultado.exito) {
      return resultado;
    }

    const feria = resultado.datos;
    const productosDetallados = [];

    for (const artesaniaId of feria.productosDestacados) {
      const artesania = artesaniaService.obtenerArtesaniaPorId(artesaniaId);
      if (artesania.exito) {
        productosDetallados.push(artesania.datos);
      }
    }

    return {
      exito: true,
      datos: {
        ...feria,
        productosDestacadosDetalle: productosDetallados
      }
    };
  }

  actualizarFeria(id, datos) {
    const feriaExistente = feriaRepository.obtenerPorId(id);

    if (!feriaExistente) {
      return {
        exito: false,
        error: 'Feria no encontrada'
      };
    }

    const validacion = this.validarDatosFeria(
      datos.nombre || feriaExistente.nombre,
      datos.ubicacion || feriaExistente.ubicacion,
      datos.fecha || feriaExistente.fecha
    );

    if (!validacion.valido) {
      return {
        exito: false,
        errores: validacion.errores
      };
    }

    const feriaActualizada = feriaRepository.actualizar(id, datos);

    return {
      exito: true,
      datos: feriaActualizada
    };
  }

  eliminarFeria(id) {
    const eliminado = feriaRepository.eliminar(id);

    if (!eliminado) {
      return {
        exito: false,
        error: 'Feria no encontrada'
      };
    }

    return {
      exito: true,
      mensaje: 'Feria eliminada correctamente'
    };
  }

  agregarProductoDestacado(feriaId, artesaniaId) {
    const resultadoArtesania = artesaniaService.obtenerArtesaniaPorId(artesaniaId);

    if (!resultadoArtesania.exito) {
      return {
        exito: false,
        error: 'Artesanía no encontrada'
      };
    }

    const feria = feriaRepository.agregarProductoDestacado(feriaId, artesaniaId);

    if (!feria) {
      return {
        exito: false,
        error: 'Feria no encontrada'
      };
    }

    return {
      exito: true,
      datos: feria
    };
  }
}

module.exports = new FeriaService();
