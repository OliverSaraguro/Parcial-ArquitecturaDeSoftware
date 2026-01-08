/**
 * CAPA DE PRESENTACIÓN - Rutas de Pedidos
 * Responsabilidad: Define los endpoints HTTP y los vincula con los controladores
 */

const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/PedidoController');

router.post('/', (req, res) => pedidoController.crear(req, res));
router.get('/', (req, res) => pedidoController.obtenerTodos(req, res));
router.get('/:id', (req, res) => pedidoController.obtenerPorId(req, res));
router.patch('/:id/estado', (req, res) => pedidoController.actualizarEstado(req, res));
router.get('/estado/:estado', (req, res) => pedidoController.obtenerPorEstado(req, res));

module.exports = router;
