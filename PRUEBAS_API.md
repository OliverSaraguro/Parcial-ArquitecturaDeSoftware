# Pruebas de API - SGV-APS

Este archivo contiene ejemplos de pruebas que puedes ejecutar para verificar que el sistema funciona correctamente.

## Iniciar el Servidor

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 1. PRUEBAS DE ARTESANÍAS

### 1.1 Listar todas las artesanías (GET)
```bash
curl http://localhost:3000/api/artesanias
```

**Respuesta esperada**:
```json
{
  "mensaje": "Artesanías obtenidas exitosamente",
  "total": 3,
  "datos": [...]
}
```

---

### 1.2 Obtener una artesanía por ID (GET)
```bash
curl http://localhost:3000/api/artesanias/1
```

**Respuesta esperada**:
```json
{
  "mensaje": "Artesanía encontrada",
  "datos": {
    "id": 1,
    "tipo": "collares",
    "material": "Plata y cuentas",
    "precio": 25.5,
    "stock": 10,
    "artesana": "María Gualán"
  }
}
```

---

### 1.3 Crear una nueva artesanía (POST)
```bash
curl -X POST http://localhost:3000/api/artesanias \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "collares",
    "material": "Piedras naturales",
    "precio": 45.00,
    "stock": 5,
    "artesana": "Elena Sarango"
  }'
```

**Respuesta esperada**:
```json
{
  "mensaje": "Artesanía creada exitosamente",
  "datos": {
    "id": 4,
    "tipo": "collares",
    "material": "Piedras naturales",
    "precio": 45,
    "stock": 5,
    "artesana": "Elena Sarango",
    "fechaCreacion": "2026-01-08T..."
  }
}
```

---

### 1.4 Actualizar una artesanía (PUT)
```bash
curl -X PUT http://localhost:3000/api/artesanias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 30.00,
    "stock": 20
  }'
```

---

### 1.5 Eliminar una artesanía (DELETE)
```bash
curl -X DELETE http://localhost:3000/api/artesanias/4
```

---

## 2. PRUEBAS DE PEDIDOS

### 2.1 Listar todos los pedidos (GET)
```bash
curl http://localhost:3000/api/pedidos
```

---

### 2.2 Crear un pedido (POST)
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteNombre": "Juan Pérez",
    "clienteEmail": "juan.perez@example.com",
    "items": [
      {
        "artesaniaId": 1,
        "cantidad": 2
      },
      {
        "artesaniaId": 2,
        "cantidad": 1
      }
    ]
  }'
```

**Respuesta esperada**:
```json
{
  "mensaje": "Pedido creado exitosamente",
  "datos": {
    "id": 1,
    "clienteNombre": "Juan Pérez",
    "clienteEmail": "juan.perez@example.com",
    "items": [
      {
        "artesaniaId": 1,
        "cantidad": 2,
        "precioUnitario": 25.5,
        "subtotal": 51
      },
      {
        "artesaniaId": 2,
        "cantidad": 1,
        "precioUnitario": 12,
        "subtotal": 12
      }
    ],
    "total": 63,
    "estado": "Pendiente",
    "fechaPedido": "2026-01-08T..."
  }
}
```

---

### 2.3 Obtener un pedido por ID (GET)
```bash
curl http://localhost:3000/api/pedidos/1
```

---

### 2.4 Actualizar estado del pedido (PATCH)
```bash
curl -X PATCH http://localhost:3000/api/pedidos/1/estado \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "Enviado"
  }'
```

**Respuesta esperada**:
```json
{
  "mensaje": "Estado del pedido actualizado exitosamente",
  "datos": {
    "id": 1,
    "estado": "Enviado",
    ...
  }
}
```

---

### 2.5 Obtener pedidos por estado (GET)
```bash
curl http://localhost:3000/api/pedidos/estado/Pendiente
```

```bash
curl http://localhost:3000/api/pedidos/estado/Enviado
```

```bash
curl http://localhost:3000/api/pedidos/estado/Entregado
```

---

## 3. PRUEBAS DE FERIAS

### 3.1 Listar todas las ferias (GET)
```bash
curl http://localhost:3000/api/ferias
```

---

### 3.2 Crear una feria (POST)
```bash
curl -X POST http://localhost:3000/api/ferias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Feria Cultural Saraguro 2026",
    "ubicacion": "Plaza Central de Saraguro",
    "fecha": "2026-03-15",
    "productosDestacados": [1, 2, 3]
  }'
```

**Respuesta esperada**:
```json
{
  "mensaje": "Feria creada exitosamente",
  "datos": {
    "id": 2,
    "nombre": "Feria Cultural Saraguro 2026",
    "ubicacion": "Plaza Central de Saraguro",
    "fecha": "2026-03-15T...",
    "productosDestacados": [1, 2, 3],
    "fechaCreacion": "2026-01-08T..."
  }
}
```

---

### 3.3 Obtener una feria con productos destacados (GET)
```bash
curl http://localhost:3000/api/ferias/1
```

**Respuesta esperada**:
```json
{
  "mensaje": "Feria encontrada",
  "datos": {
    "id": 1,
    "nombre": "Feria de Artesanías Saraguro 2026",
    "ubicacion": "Plaza Central de Saraguro",
    "fecha": "2026-02-15T...",
    "productosDestacados": [1, 2],
    "productosDestacadosDetalle": [
      {
        "id": 1,
        "tipo": "collares",
        "material": "Plata y cuentas",
        "precio": 25.5,
        ...
      },
      {
        "id": 2,
        "tipo": "aretes",
        "material": "Semillas naturales",
        "precio": 12,
        ...
      }
    ],
    "fechaCreacion": "..."
  }
}
```

---

### 3.4 Actualizar una feria (PUT)
```bash
curl -X PUT http://localhost:3000/api/ferias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Feria Internacional Saraguro 2026",
    "ubicacion": "Centro Cultural"
  }'
```

---

### 3.5 Agregar producto destacado a una feria (POST)
```bash
curl -X POST http://localhost:3000/api/ferias/1/productos-destacados \
  -H "Content-Type: application/json" \
  -d '{
    "artesaniaId": 3
  }'
```

---

### 3.6 Eliminar una feria (DELETE)
```bash
curl -X DELETE http://localhost:3000/api/ferias/2
```

---

## 4. PRUEBAS DE VALIDACIÓN

### 4.1 Intentar crear artesanía con datos inválidos
```bash
curl -X POST http://localhost:3000/api/artesanias \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "invalid",
    "material": "ab",
    "precio": -10,
    "stock": -5,
    "artesana": "X"
  }'
```

**Respuesta esperada**: Error 400 con lista de errores de validación.

---

### 4.2 Intentar crear pedido sin stock suficiente
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteNombre": "María López",
    "clienteEmail": "maria@example.com",
    "items": [
      {
        "artesaniaId": 1,
        "cantidad": 1000
      }
    ]
  }'
```

**Respuesta esperada**: Error 400 indicando stock insuficiente.

---

### 4.3 Intentar transición de estado inválida
```bash
# Primero crear un pedido y cambiar su estado a Entregado
curl -X PATCH http://localhost:3000/api/pedidos/1/estado \
  -H "Content-Type: application/json" \
  -d '{"estado": "Entregado"}'

# Luego intentar cambiarlo a Pendiente (no permitido)
curl -X PATCH http://localhost:3000/api/pedidos/1/estado \
  -H "Content-Type: application/json" \
  -d '{"estado": "Pendiente"}'
```

**Respuesta esperada**: Error 400 indicando que la transición no es válida.

---

## 5. SECUENCIA DE PRUEBA COMPLETA

Ejecuta esta secuencia para probar el flujo completo del sistema:

```bash
# 1. Listar artesanías disponibles
curl http://localhost:3000/api/artesanias

# 2. Crear un pedido
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteNombre": "Ana García",
    "clienteEmail": "ana@example.com",
    "items": [
      {"artesaniaId": 1, "cantidad": 1},
      {"artesaniaId": 3, "cantidad": 2}
    ]
  }'

# 3. Verificar que el stock se redujo
curl http://localhost:3000/api/artesanias/1
curl http://localhost:3000/api/artesanias/3

# 4. Actualizar el estado del pedido a Enviado
curl -X PATCH http://localhost:3000/api/pedidos/1/estado \
  -H "Content-Type: application/json" \
  -d '{"estado": "Enviado"}'

# 5. Verificar pedidos enviados
curl http://localhost:3000/api/pedidos/estado/Enviado

# 6. Crear una feria con productos destacados
curl -X POST http://localhost:3000/api/ferias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Feria de Verano 2026",
    "ubicacion": "Parque Municipal",
    "fecha": "2026-06-20",
    "productosDestacados": [1, 2]
  }'

# 7. Consultar la feria con los productos destacados
curl http://localhost:3000/api/ferias/2
```

---

## NOTAS IMPORTANTES

1. **El sistema usa base de datos en memoria**: Los datos se reinician cada vez que reinicias el servidor.

2. **IDs autoincrementales**: Los IDs comienzan en 1 y se incrementan con cada creación.

3. **Datos iniciales**: El sistema viene con 3 artesanías y 1 feria precargadas para pruebas inmediatas.

4. **Estados de pedido**: Solo se permiten transiciones válidas:
   - Pendiente → Enviado ✅
   - Enviado → Entregado ✅
   - Entregado → Pendiente ❌
   - Pendiente → Entregado ❌

5. **Gestión de stock**: Al crear un pedido, el stock de las artesanías se reduce automáticamente.

---

## HERRAMIENTAS ALTERNATIVAS

Si prefieres usar herramientas gráficas en lugar de curl:

### Postman
1. Importa la colección de endpoints
2. Configura la URL base: `http://localhost:3000`
3. Ejecuta las peticiones

### Insomnia
Similar a Postman, permite guardar y organizar las peticiones.

### Thunder Client (VS Code Extension)
Extensión de VS Code que funciona similar a Postman, integrada en el editor.

---

¡Listo para demostrar el sistema ante DeepWiki!
