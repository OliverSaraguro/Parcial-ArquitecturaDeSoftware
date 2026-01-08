/**
 * CAPA DE PRESENTACIÓN - Rutas de Ferias
 * Responsabilidad: Define los endpoints HTTP y los vincula con los controladores
 */

const express = require('express');
const router = express.Router();
const feriaController = require('../controllers/FeriaController');

router.post('/', (req, res) => feriaController.crear(req, res));
router.get('/', (req, res) => feriaController.obtenerTodos(req, res));
router.get('/:id', (req, res) => feriaController.obtenerPorId(req, res));
router.put('/:id', (req, res) => feriaController.actualizar(req, res));
router.delete('/:id', (req, res) => feriaController.eliminar(req, res));
router.post('/:id/productos-destacados', (req, res) => feriaController.agregarProductoDestacado(req, res));

module.exports = router;
