# Guion de Video Demostrativo - SGV-APS
## Sistema de Gestión y Venta de Artesanías del Pueblo Saraguro

**Duración**: 1 minuto

---

## GUION (60 segundos)

### [0-10s] INTRODUCCIÓN
**[MOSTRAR: Código del proyecto en VS Code]**

"Hola, soy Oliver Saraguro. Les presento el Sistema de Gestión y Venta de Artesanías del Pueblo Saraguro, desarrollado con una arquitectura de 3 capas estrictamente separadas."

---

### [10-25s] ARQUITECTURA
**[MOSTRAR: Estructura de carpetas en el explorador]**

"La arquitectura está dividida en tres capas:
- Capa de Presentación: Maneja las rutas y controladores HTTP
- Capa de Lógica de Negocio: Contiene las validaciones, cálculos de totales y gestión de stock
- Capa de Persistencia: Gestiona los modelos y el acceso a datos

Cada capa tiene responsabilidades específicas y NO se comunican directamente entre presentación y persistencia."

---

### [25-40s] DEMOSTRACIÓN EN VIVO
**[MOSTRAR: Terminal ejecutando el servidor]**

```bash
npm start
```

**[MOSTRAR: Postman o curl haciendo peticiones]**

"El sistema está corriendo. Voy a crear un pedido:"

```bash
POST /api/pedidos
{
  "clienteNombre": "Juan Pérez",
  "clienteEmail": "juan@example.com",
  "items": [{"artesaniaId": 1, "cantidad": 2}]
}
```

**[MOSTRAR: Respuesta exitosa con el total calculado]**

"Como pueden ver, el sistema calculó el total, validó el stock y creó el pedido correctamente."

---

### [40-55s] VALIDACIÓN DE ARQUITECTURA
**[MOSTRAR: Archivo de servicio con validaciones]**

"Todas las validaciones están en la capa de servicios, no en los controladores. Los controladores solo reciben la petición HTTP y delegan al servicio."

**[MOSTRAR: Repositorio]**

"Y la persistencia solo maneja las operaciones CRUD, sin lógica de negocio."

---

### [55-60s] CIERRE
**[MOSTRAR: README.md]**

"El proyecto incluye documentación completa, pruebas de API y cumple estrictamente con la arquitectura de 3 capas para la evaluación de DeepWiki. Gracias por su atención."

---

## TIPS PARA LA GRABACIÓN

### Preparación antes de grabar:
1. ✅ Tener el servidor corriendo: `npm start`
2. ✅ Tener Postman o curl listo con las peticiones preparadas
3. ✅ Abrir VS Code con la estructura del proyecto visible
4. ✅ Tener el README.md abierto en otra pestaña
5. ✅ Cerrar notificaciones y aplicaciones innecesarias

### Durante la grabación:
- Hablar con claridad y ritmo pausado
- Señalar con el cursor las partes importantes del código
- Mostrar la respuesta exitosa de las peticiones
- Enfatizar la separación de capas

### Herramientas recomendadas:
- **OBS Studio**: Para grabar la pantalla
- **Postman**: Para hacer las peticiones HTTP (más visual)
- **Zoom**: Incrementar el tamaño de la fuente del terminal y editor

---

## PETICIONES PARA DEMOSTRAR

### 1. Listar artesanías (GET)
```bash
curl http://localhost:3000/api/artesanias
```

### 2. Crear un pedido (POST)
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteNombre": "Juan Pérez",
    "clienteEmail": "juan@example.com",
    "items": [
      {"artesaniaId": 1, "cantidad": 2},
      {"artesaniaId": 2, "cantidad": 1}
    ]
  }'
```

### 3. Actualizar estado del pedido (PATCH)
```bash
curl -X PATCH http://localhost:3000/api/pedidos/1/estado \
  -H "Content-Type: application/json" \
  -d '{"estado": "Enviado"}'
```

---

## RESUMEN DE PUNTOS CLAVE A MENCIONAR

1. ✅ **Arquitectura de 3 capas** estrictamente separada
2. ✅ **Separación de responsabilidades**: Cada capa tiene una función específica
3. ✅ **No hay saltos de capas**: Presentación → Servicios → Persistencia
4. ✅ **Validaciones en la capa correcta**: Servicios, no controladores
5. ✅ **Funcionalidad completa**: CRUD de artesanías, gestión de pedidos y ferias
6. ✅ **Código limpio y documentado**: Comentarios en cada archivo
7. ✅ **Listo para DeepWiki**: Cumple con todos los requisitos de arquitectura

---

## ALTERNATIVA: GUION CORTO (30 segundos)

Si necesitas un video más corto:

"Hola, les presento el SGV-APS con arquitectura de 3 capas: Presentación para HTTP, Servicios para lógica de negocio, y Persistencia para datos. Sin saltos de capas. Aquí está el sistema corriendo [DEMO RÁPIDA DE CREAR PEDIDO]. Las validaciones están en servicios, el CRUD en repositorios, y los controladores solo manejan HTTP. Arquitectura limpia y lista para DeepWiki. Gracias."

---

¡Éxito en tu presentación!
