# 🎨 Interfaz Web - SGV-APS

## Interfaz Visual Minimalista para el Sistema de Gestión de Artesanías

---

## 🚀 Acceso a la Interfaz

Una vez que el servidor esté corriendo (`npm start`), abre tu navegador en:

```
http://localhost:3000
```

---

## Funcionalidades de la Interfaz

### **Página de Inicio**
- Dashboard con tarjetas de bienvenida
- Acceso rápido a las tres secciones principales
- Información sobre la arquitectura del sistema

### **Sección de Artesanías** 🎨
- ✅ Ver catálogo completo de artesanías
- ✅ Crear nuevas artesanías (collares, aretes, manillas)
- ✅ Editar artesanías existentes
- ✅ Eliminar artesanías
- ✅ Validación en tiempo real

**Campos del formulario:**
- Tipo (collares, aretes, manillas)
- Material
- Precio
- Stock
- Artesana

### **Sección de Pedidos** 🛒
- ✅ Ver todos los pedidos
- ✅ Crear nuevos pedidos
- ✅ Filtrar pedidos por estado (Pendiente, Enviado, Entregado)
- ✅ Cambiar estado de pedidos
- ✅ Agregar múltiples artículos a un pedido
- ✅ Cálculo automático de totales

**Campos del formulario:**
- Nombre del cliente
- Email del cliente
- Artículos (puede agregar múltiples)
- Cantidad por artículo

**Estados del pedido:**
- 🟡 Pendiente → 🔵 Enviado → 🟢 Entregado

### **Sección de Ferias** 🎪
- ✅ Ver todas las ferias
- ✅ Crear nuevas ferias
- ✅ Editar ferias existentes
- ✅ Eliminar ferias
- ✅ Seleccionar productos destacados con checkboxes

**Campos del formulario:**
- Nombre de la feria
- Ubicación
- Fecha del evento
- Productos destacados (múltiple selección)

---

## 🎨 Diseño Minimalista

La interfaz utiliza un diseño limpio y moderno con:

### **Paleta de colores:**
- 🔵 Primary: `#2c3e50` (Azul oscuro)
- 🔵 Accent: `#3498db` (Azul claro)
- 🟢 Success: `#27ae60` (Verde)
- 🟡 Warning: `#f39c12` (Naranja)
- 🔴 Danger: `#e74c3c` (Rojo)

### **Características del diseño:**
- Tipografía moderna (System fonts)
- Tarjetas con sombras suaves
- Botones con animaciones hover
- Tablas responsivas
- Formularios intuitivos
- Notificaciones toast

---

## 📋 Cómo Usar la Interfaz

### 1. **Crear una Artesanía**
1. Ve a la sección "Artesanías"
2. Haz clic en "+ Nueva Artesanía"
3. Llena el formulario
4. Haz clic en "Guardar"
5. Verás una notificación de éxito

### 2. **Crear un Pedido**
1. Ve a la sección "Pedidos"
2. Haz clic en "+ Nuevo Pedido"
3. Ingresa los datos del cliente
4. Selecciona las artesanías y cantidades
5. Puedes agregar más artículos con "+ Agregar Artículo"
6. Haz clic en "Crear Pedido"
7. El sistema calculará el total automáticamente

### 3. **Cambiar Estado de un Pedido**
1. Ve a la sección "Pedidos"
2. Encuentra el pedido que quieres actualizar
3. Haz clic en "Cambiar Estado"
4. El estado cambiará automáticamente:
   - Pendiente → Enviado
   - Enviado → Entregado

### 4. **Filtrar Pedidos**
1. Ve a la sección "Pedidos"
2. Usa los botones de filtro:
   - Todos
   - Pendiente
   - Enviado
   - Entregado

### 5. **Crear una Feria**
1. Ve a la sección "Ferias"
2. Haz clic en "+ Nueva Feria"
3. Llena los datos de la feria
4. Selecciona los productos destacados (checkboxes)
5. Haz clic en "Guardar"

---

## 🔔 Notificaciones

La interfaz muestra notificaciones toast en la esquina inferior derecha:

- 🟢 **Verde**: Operación exitosa
- 🔴 **Rojo**: Error
- 🟡 **Amarillo**: Advertencia

Las notificaciones desaparecen automáticamente después de 3 segundos.

---

## 📱 Responsive Design

La interfaz es completamente responsive y se adapta a:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

---

## 🛠️ Tecnologías Utilizadas

### **Frontend:**
- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript Vanilla (ES6+)
- Fetch API para comunicación con el backend

### **No se utilizaron frameworks ni librerías externas:**
- ❌ No React
- ❌ No Vue
- ❌ No jQuery
- ❌ No Bootstrap

Todo es código puro y minimalista.

---

## 📁 Estructura de Archivos

```
public/
├── index.html          # Página principal (HTML)
├── css/
│   └── styles.css      # Estilos minimalistas
└── js/
    └── app.js          # Lógica de la interfaz
```

---

## 🔄 Interacción con la API

La interfaz se comunica con el backend mediante:

```javascript
// Ejemplo: Obtener artesanías
fetch('http://localhost:3000/api/artesanias')
  .then(response => response.json())
  .then(data => {
    // Mostrar artesanías en la tabla
  });

// Ejemplo: Crear un pedido
fetch('http://localhost:3000/api/pedidos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(datosPedido)
})
  .then(response => response.json())
  .then(result => {
    // Mostrar notificación de éxito
  });
```

---

## ✨ Características Destacadas

### **1. Validación en tiempo real**
- Los formularios validan los datos antes de enviarlos
- Mensajes de error claros

### **2. Experiencia de usuario fluida**
- Animaciones suaves
- Transiciones elegantes
- Feedback inmediato

### **3. Gestión de estado**
- La interfaz se actualiza automáticamente después de cada operación
- No necesitas recargar la página

### **4. Diseño intuitivo**
- Navegación clara
- Botones con iconos descriptivos
- Colores semánticos (verde=éxito, rojo=eliminar, etc.)

---

## 🎥 Para el Video Demostrativo

La interfaz visual hace que la demostración sea mucho más atractiva:

1. **Mostrar la página principal** (Dashboard)
2. **Navegar a Artesanías** y crear una nueva
3. **Ir a Pedidos** y crear un pedido con múltiples artículos
4. **Mostrar el cálculo automático** del total
5. **Cambiar el estado** del pedido
6. **Filtrar pedidos** por estado
7. **Crear una feria** con productos destacados

---

## 🐛 Solución de Problemas

### **La interfaz no carga:**
- Verifica que el servidor esté corriendo (`npm start`)
- Abre http://localhost:3000 en el navegador

### **No se cargan los datos:**
- Abre la consola del navegador (F12)
- Verifica que no haya errores
- Asegúrate de que la API esté respondiendo

### **Error de CORS:**
- El servidor y la interfaz están en el mismo dominio
- No debería haber problemas de CORS

---

## 📊 Capturas de Pantalla (Descripción)

### **Página Principal:**
- Tres tarjetas grandes (Artesanías, Pedidos, Ferias)
- Header con gradiente azul
- Navegación con tabs

### **Sección de Artesanías:**
- Tabla con todas las artesanías
- Botones de editar y eliminar en cada fila
- Formulario desplegable para crear/editar

### **Sección de Pedidos:**
- Tabla con pedidos y sus estados
- Badges de colores para estados
- Filtros en la parte superior
- Formulario con múltiples items

### **Sección de Ferias:**
- Tabla con información de ferias
- Formulario con checkboxes para productos destacados
- Selector de fecha

---

## 🎯 Ventajas de la Interfaz

✅ **Para el usuario:**
- Más fácil de usar que Postman o curl
- Visual y atractivo
- Intuitivo

✅ **Para la demostración:**
- Más profesional
- Mejor para el video
- Muestra el proyecto completo

✅ **Para la evaluación:**
- Demuestra habilidades de frontend
- Muestra integración completa
- Evidencia de arquitectura full-stack

---

## 🚀 Próximos Pasos

1. ✅ Reinicia el servidor: `npm start`
2. ✅ Abre el navegador: http://localhost:3000
3. ✅ Explora la interfaz
4. ✅ Crea artesanías, pedidos y ferias
5. ✅ Usa esto para tu video demostrativo

---

¡Disfruta de la interfaz visual! 🎉
