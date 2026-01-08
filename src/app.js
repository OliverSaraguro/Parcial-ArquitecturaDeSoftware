/**
 * APLICACIÓN PRINCIPAL - SGV-APS
 * Sistema de Gestión y Venta de Artesanías del Pueblo Saraguro
 * Arquitectura: 3 Capas estrictamente separadas
 *
 * CAPA DE PRESENTACIÓN: /presentation (controllers, routes)
 * CAPA DE LÓGICA DE NEGOCIO: /services
 * CAPA DE PERSISTENCIA: /persistence (models, repositories)
 */

const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos (Interfaz Web)
app.use(express.static(path.join(__dirname, '../public')));

// Importar rutas (Capa de Presentación)
const artesaniaRoutes = require('./presentation/routes/artesaniaRoutes');
const pedidoRoutes = require('./presentation/routes/pedidoRoutes');
const feriaRoutes = require('./presentation/routes/feriaRoutes');

// Registrar rutas
app.use('/api/artesanias', artesaniaRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/ferias', feriaRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    mensaje: 'Error interno del servidor',
    error: err.message
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log('================================================================================');
  console.log('SGV-APS - Sistema de Gestión y Venta de Artesanías del Pueblo Saraguro');
  console.log('================================================================================');
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Arquitectura: 3 Capas (Presentación, Servicios, Persistencia)');
  console.log('');
  console.log('🌐 Interfaz Web:');
  console.log(`  ➜ http://localhost:${PORT}`);
  console.log('');
  console.log('📡 API REST Endpoints:');
  console.log(`  - GET    http://localhost:${PORT}/api/artesanias`);
  console.log(`  - POST   http://localhost:${PORT}/api/artesanias`);
  console.log(`  - GET    http://localhost:${PORT}/api/pedidos`);
  console.log(`  - POST   http://localhost:${PORT}/api/pedidos`);
  console.log(`  - GET    http://localhost:${PORT}/api/ferias`);
  console.log(`  - POST   http://localhost:${PORT}/api/ferias`);
  console.log('================================================================================');
});

module.exports = app;
