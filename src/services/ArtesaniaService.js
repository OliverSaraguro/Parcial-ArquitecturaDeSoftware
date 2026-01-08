/**
 * CAPA DE LÓGICA DE NEGOCIO - Servicio de Artesanías
 * Responsabilidad: Validaciones y reglas de negocio de artesanías
 * NO conoce HTTP ni acceso directo a base de datos
 * Interactúa con la capa de persistencia a través de repositorios
 */

const artesaniaRepository = require('../persistence/repositories/ArtesaniaRepository');

class ArtesaniaService {

  validarDatosArtesania(tipo, material, precio, stock, artesana) {
    const errores = [];

    const tiposValidos = ['collares', 'aretes', 'manillas'];
    if (!tipo || !tiposValidos.includes(tipo.toLowerCase())) {
      errores.push('El tipo debe ser: collares, aretes o manillas');
    }

    if (!material || material.trim().length < 3) {
      errores.push('El material debe tener al menos 3 caracteres');
    }

    if (!precio || precio <= 0) {
      errores.push('El precio debe ser mayor a 0');
    }

    if (stock === undefined || stock < 0) {
      errores.push('El stock no puede ser negativo');
    }

    if (!artesana || artesana.trim().length < 3) {
      errores.push('El nombre de la artesana debe tener al menos 3 caracteres');
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  crearArtesania(tipo, material, precio, stock, artesana) {
    const validacion = this.validarDatosArtesania(tipo, material, precio, stock, artesana);

    if (!validacion.valido) {
      return {
        exito: false,
        errores: validacion.errores
      };
    }

    const artesania = artesaniaRepository.crear(
      tipo.toLowerCase(),
      material.trim(),
      parseFloat(precio),
      parseInt(stock),
      artesana.trim()
    );

    return {
      exito: true,
      datos: artesania
    };
  }

  obtenerTodasLasArtesanias() {
    return artesaniaRepository.obtenerTodos();
  }

  obtenerArtesaniaPorId(id) {
    const artesania = artesaniaRepository.obtenerPorId(id);

    if (!artesania) {
      return {
        exito: false,
        error: 'Artesanía no encontrada'
      };
    }

    return {
      exito: true,
      datos: artesania
    };
  }

  actualizarArtesania(id, datos) {
    const artesaniaExistente = artesaniaRepository.obtenerPorId(id);

    if (!artesaniaExistente) {
      return {
        exito: false,
        error: 'Artesanía no encontrada'
      };
    }

    const validacion = this.validarDatosArtesania(
      datos.tipo || artesaniaExistente.tipo,
      datos.material || artesaniaExistente.material,
      datos.precio !== undefined ? datos.precio : artesaniaExistente.precio,
      datos.stock !== undefined ? datos.stock : artesaniaExistente.stock,
      datos.artesana || artesaniaExistente.artesana
    );

    if (!validacion.valido) {
      return {
        exito: false,
        errores: validacion.errores
      };
    }

    const artesaniaActualizada = artesaniaRepository.actualizar(id, datos);

    return {
      exito: true,
      datos: artesaniaActualizada
    };
  }

  eliminarArtesania(id) {
    const eliminado = artesaniaRepository.eliminar(id);

    if (!eliminado) {
      return {
        exito: false,
        error: 'Artesanía no encontrada'
      };
    }

    return {
      exito: true,
      mensaje: 'Artesanía eliminada correctamente'
    };
  }

  verificarDisponibilidadStock(id, cantidadRequerida) {
    const artesania = artesaniaRepository.obtenerPorId(id);

    if (!artesania) {
      return {
        disponible: false,
        error: 'Artesanía no encontrada'
      };
    }

    if (artesania.stock < cantidadRequerida) {
      return {
        disponible: false,
        error: `Stock insuficiente. Disponible: ${artesania.stock}, Requerido: ${cantidadRequerida}`
      };
    }

    return {
      disponible: true,
      artesania
    };
  }

  reducirStock(id, cantidad) {
    const artesania = artesaniaRepository.obtenerPorId(id);
    if (!artesania) return false;

    const nuevoStock = artesania.stock - cantidad;
    artesaniaRepository.actualizarStock(id, nuevoStock);
    return true;
  }
}

module.exports = new ArtesaniaService();
