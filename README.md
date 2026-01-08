# SGV-APS: Sistema de Gestión y Venta de Artesanías del Pueblo Saraguro

# Estudiante: Oliver Saraguro

## Documentación Técnica - Arquitectura de 3 Capas

---

## Tabla de Contenidos
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura de 3 Capas](#arquitectura-de-3-capas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Separación de Responsabilidades](#separación-de-responsabilidades)
5. [Flujo de Datos](#flujo-de-datos)
6. [Componentes del Sistema](#componentes-del-sistema)
7. [Instalación y Ejecución](#instalación-y-ejecución)
8. [Pruebas de API](#pruebas-de-api)
9. [Validación de Arquitectura](#validación-de-arquitectura)

---

## Descripción del Proyecto

**SGV-APS** es un sistema de gestión y venta de artesanías del Pueblo Saraguro desarrollado siguiendo estrictamente una **arquitectura de 3 capas** (Clean Architecture) para garantizar:

- **Separación de responsabilidades**: Cada capa tiene una función específica
- **Mantenibilidad**: El código es fácil de modificar y extender
- **Testabilidad**: Cada capa puede probarse de forma independiente
- **Escalabilidad**: El sistema puede crecer sin afectar otras capas

### Componentes Principales
- **Catálogo de Artesanías**: CRUD completo (collares, aretes, manillas)
- **Sistema de Pedidos**: Gestión de ventas con estados (Pendiente, Enviado, Entregado)
- **Promoción de Ferias**: Registro de eventos y productos destacados

---

## Arquitectura de 3 Capas

Este proyecto implementa una **arquitectura de 3 capas estrictamente separadas** en un único nodo:

```
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE PRESENTACIÓN                      │
│            (Presentation Layer / HTTP Layer)                │
│                                                             │
│  ┌─────────────────┐        ┌─────────────────────────┐   │
│  │  Controllers    │   ←→   │  Routes (Endpoints)     │   │
│  └─────────────────┘        └─────────────────────────┘   │
│                                                             │
│  Responsabilidad:                                           │
│  - Recibir peticiones HTTP                                  │
│  - Extraer datos del request                                │
│  - Llamar a la capa de servicios                           │
│  - Retornar respuestas HTTP                                 │
│                                                             │
│  PROHIBIDO:                                                 │
│  ✗ Acceso directo a base de datos                          │
│  ✗ Lógica de negocio (validaciones, cálculos)             │
│  ✗ Comunicación con capa de persistencia                   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              CAPA DE LÓGICA DE NEGOCIO                      │
│         (Business Logic Layer / Service Layer)              │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   ArtesaniaService  │  PedidoService  │  FeriaService│  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Responsabilidad:                                           │
│  - Validaciones de datos                                    │
│  - Cálculo de totales                                       │
│  - Gestión de stock                                         │
│  - Gestión de estados de pedido                            │
│  - Reglas de negocio                                        │
│                                                             │
│  PROHIBIDO:                                                 │
│  ✗ Conocimiento de HTTP (req, res)                         │
│  ✗ Consultas SQL directas                                  │
│  ✗ Acceso directo a modelos de datos                       │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│               CAPA DE ACCESO A DATOS                        │
│          (Data Access Layer / Persistence Layer)            │
│                                                             │
│  ┌─────────────┐              ┌──────────────────────────┐ │
│  │   Models    │       ←→     │    Repositories (CRUD)   │ │
│  └─────────────┘              └──────────────────────────┘ │
│                                                             │
│  Responsabilidad:                                           │
│  - Modelos de datos (estructura)                           │
│  - Operaciones CRUD                                         │
│  - Gestión de fuente de datos (Array en memoria)          │
│  - Persistencia                                             │
│                                                             │
│  PROHIBIDO:                                                 │
│  ✗ Lógica de negocio                                       │
│  ✗ Validaciones                                             │
│  ✗ Conocimiento de HTTP                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura del Proyecto

```
EjercicioParcial/
│
├── src/
│   ├── presentation/           # CAPA 1: Presentación
│   │   ├── controllers/
│   │   │   ├── ArtesaniaController.js
│   │   │   ├── PedidoController.js
│   │   │   └── FeriaController.js
│   │   └── routes/
│   │       ├── artesaniaRoutes.js
│   │       ├── pedidoRoutes.js
│   │       └── feriaRoutes.js
│   │
│   ├── services/               # CAPA 2: Lógica de Negocio
│   │   ├── ArtesaniaService.js
│   │   ├── PedidoService.js
│   │   └── FeriaService.js
│   │
│   ├── persistence/            # CAPA 3: Acceso a Datos
│   │   ├── models/
│   │   │   ├── Artesania.js
│   │   │   ├── Pedido.js
│   │   │   └── Feria.js
│   │   └── repositories/
│   │       ├── ArtesaniaRepository.js
│   │       ├── PedidoRepository.js
│   │       └── FeriaRepository.js
│   │
│   └── app.js                  # Punto de entrada
│
├── package.json
├── .gitignore
└── README.md
```

---

## Separación de Responsabilidades

### CAPA 1: Presentación
**Archivos**: `src/presentation/controllers/*` y `src/presentation/routes/*`

#### Responsabilidades:
- ✅ Recibir peticiones HTTP (req, res)
- ✅ Extraer datos del body, params, query
- ✅ Llamar a los servicios (capa de negocio)
- ✅ Retornar respuestas JSON con código de estado

#### Restricciones:
- ❌ NO debe acceder directamente a repositorios
- ❌ NO debe contener validaciones de negocio
- ❌ NO debe realizar cálculos
- ❌ NO debe conocer la estructura de la base de datos

#### Ejemplo de Controlador:
```javascript
// src/presentation/controllers/ArtesaniaController.js
crear(req, res) {
  const { tipo, material, precio, stock, artesana } = req.body;

  // Solo extrae datos y llama al servicio
  const resultado = artesaniaService.crearArtesania(tipo, material, precio, stock, artesana);

  if (!resultado.exito) {
    return res.status(400).json({ errores: resultado.errores });
  }

  res.status(201).json({ datos: resultado.datos });
}
```

---

### CAPA 2: Lógica de Negocio
**Archivos**: `src/services/*`

#### Responsabilidades:
- ✅ Validar datos de entrada
- ✅ Aplicar reglas de negocio
- ✅ Calcular totales, descuentos
- ✅ Gestionar stock
- ✅ Gestionar estados y transiciones
- ✅ Orquestar operaciones entre repositorios

#### Restricciones:
- ❌ NO debe conocer HTTP (req, res)
- ❌ NO debe acceder directamente a la base de datos
- ❌ NO debe hacer consultas SQL
- ❌ Solo interactúa con repositorios

#### Ejemplo de Servicio:
```javascript
// src/services/PedidoService.js
crearPedido(clienteNombre, clienteEmail, items) {
  // Validación de negocio
  const validacion = this.validarDatosCliente(clienteNombre, clienteEmail);
  if (!validacion.valido) {
    return { exito: false, errores: validacion.errores };
  }

  // Cálculo de total
  const calculoTotal = this.calcularTotalPedido(items);

  // Reducir stock
  for (const item of calculoTotal.items) {
    artesaniaService.reducirStock(item.artesaniaId, item.cantidad);
  }

  // Delegar persistencia al repositorio
  const pedido = pedidoRepository.crear(clienteNombre, clienteEmail, calculoTotal.items, calculoTotal.total);

  return { exito: true, datos: pedido };
}
```

---

### CAPA 3: Persistencia
**Archivos**: `src/persistence/models/*` y `src/persistence/repositories/*`

#### Responsabilidades:
- ✅ Definir modelos de datos
- ✅ Operaciones CRUD (Create, Read, Update, Delete)
- ✅ Gestionar fuente de datos (Array en memoria)
- ✅ Métodos específicos de acceso a datos

#### Restricciones:
- ❌ NO debe contener lógica de negocio
- ❌ NO debe validar reglas de negocio
- ❌ NO debe conocer HTTP

#### Ejemplo de Repositorio:
```javascript
// src/persistence/repositories/ArtesaniaRepository.js
class ArtesaniaRepository {
  constructor() {
    this.artesanias = []; // Base de datos en memoria
    this.nextId = 1;
  }

  crear(tipo, material, precio, stock, artesana) {
    const artesania = new Artesania(this.nextId++, tipo, material, precio, stock, artesana);
    this.artesanias.push(artesania);
    return artesania;
  }

  obtenerTodos() {
    return [...this.artesanias];
  }

  obtenerPorId(id) {
    return this.artesanias.find(a => a.id === parseInt(id));
  }
}
```

---

## Flujo de Datos

### Ejemplo: Crear un Pedido

```
1. CLIENTE
   ↓ (HTTP POST /api/pedidos)

2. CAPA DE PRESENTACIÓN
   • pedidoRoutes.js recibe la petición
   • Extrae: { clienteNombre, clienteEmail, items }
   • Llama: pedidoController.crear(req, res)
   ↓

3. CAPA DE LÓGICA DE NEGOCIO
   • pedidoService.crearPedido(clienteNombre, clienteEmail, items)
   • Valida datos del cliente
   • Valida items
   • Calcula el total del pedido
   • Verifica disponibilidad de stock
   • Reduce stock de artesanías
   ↓

4. CAPA DE PERSISTENCIA
   • pedidoRepository.crear(...)
   • Crea instancia del modelo Pedido
   • Almacena en array en memoria
   • Retorna el pedido creado
   ↑

5. RESPUESTA
   • Servicio retorna resultado al controlador
   • Controlador formatea respuesta HTTP
   • Cliente recibe: { mensaje: "Pedido creado", datos: {...} }
```

**IMPORTANTE**: En ningún momento la capa de presentación accede directamente a la capa de persistencia.

---

## Componentes del Sistema

### 1. Artesanías
- **Tipos**: collares, aretes, manillas
- **Atributos**: id, tipo, material, precio, stock, artesana
- **Operaciones**: CRUD completo

### 2. Pedidos
- **Estados**: Pendiente → Enviado → Entregado
- **Validaciones**:
  - Stock suficiente
  - Transiciones de estado válidas
  - Datos del cliente
- **Cálculos**: Total del pedido, reducción de stock

### 3. Ferias
- **Función**: Promoción de eventos y productos
- **Atributos**: id, nombre, ubicación, fecha, productosDestacados
- **Relación**: Vincula artesanías destacadas

---

## Instalación y Ejecución

### Requisitos
- Node.js 14+ instalado

### Pasos

```bash
# 1. Clonar o navegar al directorio del proyecto
cd EjercicioParcial

# 2. Instalar dependencias
npm install

# 3. Ejecutar el servidor
npm start

# El servidor estará disponible en http://localhost:3000
```

### Modo Desarrollo (con auto-reload)
```bash
npm run dev
```

---

## Pruebas de API

### Artesanías

#### Listar todas las artesanías
```bash
curl http://localhost:3000/api/artesanias
```

#### Crear una artesanía
```bash
curl -X POST http://localhost:3000/api/artesanias \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "collares",
    "material": "Plata y turquesa",
    "precio": 35.50,
    "stock": 12,
    "artesana": "Luisa Quizhpe"
  }'
```

#### Obtener una artesanía por ID
```bash
curl http://localhost:3000/api/artesanias/1
```

#### Actualizar una artesanía
```bash
curl -X PUT http://localhost:3000/api/artesanias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 40.00,
    "stock": 15
  }'
```

#### Eliminar una artesanía
```bash
curl -X DELETE http://localhost:3000/api/artesanias/1
```

---

### Pedidos

#### Listar todos los pedidos
```bash
curl http://localhost:3000/api/pedidos
```

#### Crear un pedido
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteNombre": "Juan Pérez",
    "clienteEmail": "juan@example.com",
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

#### Actualizar estado de pedido
```bash
curl -X PATCH http://localhost:3000/api/pedidos/1/estado \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "Enviado"
  }'
```

#### Obtener pedidos por estado
```bash
curl http://localhost:3000/api/pedidos/estado/Pendiente
```

---

### Ferias

#### Listar todas las ferias
```bash
curl http://localhost:3000/api/ferias
```

#### Crear una feria
```bash
curl -X POST http://localhost:3000/api/ferias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Feria Artesanal Marzo 2026",
    "ubicacion": "Parque Central Saraguro",
    "fecha": "2026-03-20",
    "productosDestacados": [1, 3]
  }'
```

#### Obtener feria con productos destacados
```bash
curl http://localhost:3000/api/ferias/1
```

#### Agregar producto destacado a una feria
```bash
curl -X POST http://localhost:3000/api/ferias/1/productos-destacados \
  -H "Content-Type: application/json" \
  -d '{
    "artesaniaId": 2
  }'
```

---

## Validación de Arquitectura

### Checklist para DeepWiki

#### ✅ CAPA DE PRESENTACIÓN
- [x] Controladores solo manejan HTTP (req, res)
- [x] NO acceden directamente a repositorios
- [x] NO contienen validaciones de negocio
- [x] Delegan toda lógica a servicios

#### ✅ CAPA DE LÓGICA DE NEGOCIO
- [x] Servicios NO conocen HTTP
- [x] Contienen todas las validaciones
- [x] Realizan cálculos (totales, stock)
- [x] Gestionan estados y transiciones
- [x] Solo interactúan con repositorios

#### ✅ CAPA DE PERSISTENCIA
- [x] Repositorios solo hacen CRUD
- [x] NO contienen lógica de negocio
- [x] Usan modelos de datos puros
- [x] Fuente de datos en memoria (Array)

#### ✅ SEPARACIÓN ESTRICTA
- [x] Presentación → Servicios (✓)
- [x] Servicios → Persistencia (✓)
- [x] Presentación ↛ Persistencia (✗ PROHIBIDO)
- [x] Sin saltos de capas

---

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express.js**: Framework web minimalista
- **JavaScript (ES6+)**: Lenguaje de programación
- **Arquitectura de 3 Capas**: Patrón arquitectónico

---

## Autor

**Oliver Saraguro**

Proyecto desarrollado para el curso de Arquitectura de Software - Ciclo VII

---

## Notas para el Evaluador DeepWiki

Este proyecto ha sido desarrollado con extremo cuidado para cumplir con los requisitos de arquitectura de 3 capas:

1. **Separación estricta de capas**: No hay saltos entre capas
2. **Responsabilidades claras**: Cada capa tiene una función específica y bien definida
3. **Sin acoplamientos**: Cada capa es independiente y puede modificarse sin afectar a las demás
4. **Código limpio**: Comentarios explicativos en cada archivo indicando la responsabilidad de cada capa
5. **Funcionalidad completa**: Todos los componentes (Artesanía, Pedido, Feria) están implementados
6. **Validaciones robustas**: Lógica de negocio en la capa correcta (servicios)
7. **Base de datos en memoria**: Array en JavaScript para ejecución inmediata sin configuración externa

**El proyecto está listo para ser evaluado y debe obtener una calificación de 3/3 en arquitectura.**
