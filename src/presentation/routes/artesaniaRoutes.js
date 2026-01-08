/**
 * CAPA DE PRESENTACIÓN - Rutas de Artesanías
 * Responsabilidad: Define los endpoints HTTP y los vincula con los controladores
 */

const express = require('express');
const router = express.Router();
const artesaniaController = require('../controllers/ArtesaniaController');

router.post('/', (req, res) => artesaniaController.crear(req, res));
router.get('/', (req, res) => artesaniaController.obtenerTodos(req, res));
router.get('/:id', (req, res) => artesaniaController.obtenerPorId(req, res));
router.put('/:id', (req, res) => artesaniaController.actualizar(req, res));
router.delete('/:id', (req, res) => artesaniaController.eliminar(req, res));

module.exports = router;
