/**
 * SGV-APS - Interfaz de Usuario
 * JavaScript para interactuar con la API REST
 */

const API_URL = 'http://localhost:3000/api';

// =============================================================================
// UTILIDADES
// =============================================================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');

    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    // Cargar datos de la sección
    if (sectionId === 'artesanias') cargarArtesanias();
    if (sectionId === 'pedidos') cargarPedidos();
    if (sectionId === 'ferias') cargarFerias();
}

// =============================================================================
// NAVEGACIÓN
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Configurar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showSection(btn.dataset.section);
        });
    });

    // Configurar formularios
    document.getElementById('artesaniaForm').addEventListener('submit', guardarArtesania);
    document.getElementById('pedidoForm').addEventListener('submit', crearPedido);
    document.getElementById('feriaForm').addEventListener('submit', guardarFeria);

    // Configurar filtros de pedidos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const estado = btn.dataset.estado;
            filtrarPedidos(estado);
        });
    });

    // Cargar artesanías al inicio
    cargarArtesanias();
});

// =============================================================================
// ARTESANÍAS
// =============================================================================

async function cargarArtesanias() {
    try {
        const response = await fetch(`${API_URL}/artesanias`);
        const data = await response.json();

        const container = document.getElementById('tablaArtesanias');

        if (data.datos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No hay artesanías registradas</h3>
                    <p>Comienza agregando tu primera artesanía</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Material</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Artesana</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.datos.map(art => `
                        <tr>
                            <td>${art.id}</td>
                            <td>${art.tipo}</td>
                            <td>${art.material}</td>
                            <td>$${art.precio.toFixed(2)}</td>
                            <td>${art.stock}</td>
                            <td>${art.artesana}</td>
                            <td class="table-actions">
                                <button class="btn btn-warning btn-sm" onclick="editarArtesania(${art.id})">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="eliminarArtesania(${art.id})">Eliminar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error al cargar artesanías:', error);
        showToast('Error al cargar artesanías', 'error');
    }
}

function mostrarFormularioArtesania() {
    document.getElementById('formArtesania').classList.remove('hidden');
    document.getElementById('tituloFormArtesania').textContent = 'Nueva Artesanía';
    document.getElementById('artesaniaForm').reset();
    document.getElementById('artesaniaId').value = '';
}

function cancelarFormularioArtesania() {
    document.getElementById('formArtesania').classList.add('hidden');
    document.getElementById('artesaniaForm').reset();
}

async function guardarArtesania(e) {
    e.preventDefault();

    const id = document.getElementById('artesaniaId').value;
    const datos = {
        tipo: document.getElementById('artesaniaTipo').value,
        material: document.getElementById('artesaniaMaterial').value,
        precio: parseFloat(document.getElementById('artesaniaPrecio').value),
        stock: parseInt(document.getElementById('artesaniaStock').value),
        artesana: document.getElementById('artesaniaArtesana').value
    };

    try {
        const url = id ? `${API_URL}/artesanias/${id}` : `${API_URL}/artesanias`;
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (response.ok) {
            showToast(id ? 'Artesanía actualizada' : 'Artesanía creada', 'success');
            cancelarFormularioArtesania();
            cargarArtesanias();
        } else {
            showToast(result.errores ? result.errores.join(', ') : 'Error al guardar', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al guardar artesanía', 'error');
    }
}

async function editarArtesania(id) {
    try {
        const response = await fetch(`${API_URL}/artesanias/${id}`);
        const data = await response.json();

        if (data.exito === false) {
            showToast('Artesanía no encontrada', 'error');
            return;
        }

        const art = data.datos;
        document.getElementById('artesaniaId').value = art.id;
        document.getElementById('artesaniaTipo').value = art.tipo;
        document.getElementById('artesaniaMaterial').value = art.material;
        document.getElementById('artesaniaPrecio').value = art.precio;
        document.getElementById('artesaniaStock').value = art.stock;
        document.getElementById('artesaniaArtesana').value = art.artesana;

        document.getElementById('tituloFormArtesania').textContent = 'Editar Artesanía';
        document.getElementById('formArtesania').classList.remove('hidden');

        // Scroll al formulario
        document.getElementById('formArtesania').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al cargar artesanía', 'error');
    }
}

async function eliminarArtesania(id) {
    if (!confirm('¿Estás seguro de eliminar esta artesanía?')) return;

    try {
        const response = await fetch(`${API_URL}/artesanias/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Artesanía eliminada', 'success');
            cargarArtesanias();
        } else {
            showToast('Error al eliminar artesanía', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al eliminar artesanía', 'error');
    }
}

// =============================================================================
// PEDIDOS
// =============================================================================

let pedidosTodos = [];

async function cargarPedidos() {
    try {
        const response = await fetch(`${API_URL}/pedidos`);
        const data = await response.json();
        pedidosTodos = data.datos;

        mostrarPedidos(pedidosTodos);
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
        showToast('Error al cargar pedidos', 'error');
    }
}

function mostrarPedidos(pedidos) {
    const container = document.getElementById('tablaPedidos');

    if (pedidos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No hay pedidos</h3>
                <p>Los pedidos aparecerán aquí</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${pedidos.map(pedido => `
                    <tr>
                        <td>${pedido.id}</td>
                        <td>${pedido.clienteNombre}</td>
                        <td>${pedido.clienteEmail}</td>
                        <td>$${pedido.total.toFixed(2)}</td>
                        <td><span class="badge badge-${pedido.estado.toLowerCase()}">${pedido.estado}</span></td>
                        <td>${new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                        <td class="table-actions">
                            <button class="btn btn-warning btn-sm" onclick="cambiarEstadoPedido(${pedido.id}, '${pedido.estado}')">Cambiar Estado</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function filtrarPedidos(estado) {
    if (estado === 'todos') {
        mostrarPedidos(pedidosTodos);
    } else {
        const filtrados = pedidosTodos.filter(p => p.estado === estado);
        mostrarPedidos(filtrados);
    }
}

async function mostrarFormularioPedido() {
    // Cargar artesanías para el selector
    try {
        const response = await fetch(`${API_URL}/artesanias`);
        const data = await response.json();

        const selectores = document.querySelectorAll('.item-artesania');
        selectores.forEach(select => {
            select.innerHTML = '<option value="">Selecciona una artesanía</option>' +
                data.datos.map(art =>
                    `<option value="${art.id}">${art.tipo} - ${art.material} ($${art.precio})</option>`
                ).join('');
        });

        document.getElementById('formPedido').classList.remove('hidden');
        document.getElementById('pedidoForm').reset();
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al cargar artesanías', 'error');
    }
}

function cancelarFormularioPedido() {
    document.getElementById('formPedido').classList.add('hidden');
    document.getElementById('pedidoForm').reset();

    // Resetear items a uno solo
    const container = document.getElementById('itemsPedido');
    container.innerHTML = `
        <div class="item-pedido">
            <select class="item-artesania" required>
                <option value="">Selecciona una artesanía</option>
            </select>
            <input type="number" class="item-cantidad" min="1" value="1" placeholder="Cantidad" required>
            <button type="button" class="btn-remove" onclick="removerItem(this)">✕</button>
        </div>
    `;
}

async function agregarItem() {
    // Cargar artesanías para el nuevo selector
    const response = await fetch(`${API_URL}/artesanias`);
    const data = await response.json();

    const container = document.getElementById('itemsPedido');
    const newItem = document.createElement('div');
    newItem.className = 'item-pedido';
    newItem.innerHTML = `
        <select class="item-artesania" required>
            <option value="">Selecciona una artesanía</option>
            ${data.datos.map(art =>
                `<option value="${art.id}">${art.tipo} - ${art.material} ($${art.precio})</option>`
            ).join('')}
        </select>
        <input type="number" class="item-cantidad" min="1" value="1" placeholder="Cantidad" required>
        <button type="button" class="btn-remove" onclick="removerItem(this)">✕</button>
    `;
    container.appendChild(newItem);
}

function removerItem(btn) {
    const items = document.querySelectorAll('.item-pedido');
    if (items.length > 1) {
        btn.closest('.item-pedido').remove();
    } else {
        showToast('Debe haber al menos un artículo', 'warning');
    }
}

async function crearPedido(e) {
    e.preventDefault();

    const items = [];
    document.querySelectorAll('.item-pedido').forEach(item => {
        const artesaniaId = parseInt(item.querySelector('.item-artesania').value);
        const cantidad = parseInt(item.querySelector('.item-cantidad').value);
        if (artesaniaId && cantidad) {
            items.push({ artesaniaId, cantidad });
        }
    });

    const datos = {
        clienteNombre: document.getElementById('pedidoCliente').value,
        clienteEmail: document.getElementById('pedidoEmail').value,
        items
    };

    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (response.ok) {
            showToast('Pedido creado exitosamente', 'success');
            cancelarFormularioPedido();
            cargarPedidos();
        } else {
            showToast(result.error || result.errores?.join(', ') || 'Error al crear pedido', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al crear pedido', 'error');
    }
}

async function cambiarEstadoPedido(id, estadoActual) {
    const estados = {
        'Pendiente': 'Enviado',
        'Enviado': 'Entregado',
        'Entregado': 'Entregado'
    };

    const nuevoEstado = estados[estadoActual];

    if (estadoActual === 'Entregado') {
        showToast('El pedido ya está entregado', 'warning');
        return;
    }

    if (!confirm(`¿Cambiar estado a ${nuevoEstado}?`)) return;

    try {
        const response = await fetch(`${API_URL}/pedidos/${id}/estado`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado })
        });

        if (response.ok) {
            showToast(`Estado actualizado a ${nuevoEstado}`, 'success');
            cargarPedidos();
        } else {
            const result = await response.json();
            showToast(result.mensaje || 'Error al actualizar estado', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al actualizar estado', 'error');
    }
}

// =============================================================================
// FERIAS
// =============================================================================

async function cargarFerias() {
    try {
        const response = await fetch(`${API_URL}/ferias`);
        const data = await response.json();

        const container = document.getElementById('tablaFerias');

        if (data.datos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No hay ferias registradas</h3>
                    <p>Crea tu primera feria</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Fecha</th>
                        <th>Productos Destacados</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.datos.map(feria => `
                        <tr>
                            <td>${feria.id}</td>
                            <td>${feria.nombre}</td>
                            <td>${feria.ubicacion}</td>
                            <td>${new Date(feria.fecha).toLocaleDateString()}</td>
                            <td>${feria.productosDestacados.length} productos</td>
                            <td class="table-actions">
                                <button class="btn btn-warning btn-sm" onclick="editarFeria(${feria.id})">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="eliminarFeria(${feria.id})">Eliminar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error al cargar ferias:', error);
        showToast('Error al cargar ferias', 'error');
    }
}

async function mostrarFormularioFeria() {
    // Cargar artesanías para productos destacados
    try {
        const response = await fetch(`${API_URL}/artesanias`);
        const data = await response.json();

        const container = document.getElementById('productosDestacados');
        container.innerHTML = data.datos.map(art => `
            <div class="checkbox-item">
                <input type="checkbox" id="prod_${art.id}" value="${art.id}">
                <label for="prod_${art.id}">${art.tipo} - ${art.material}</label>
            </div>
        `).join('');

        document.getElementById('formFeria').classList.remove('hidden');
        document.getElementById('tituloFormFeria').textContent = 'Nueva Feria';
        document.getElementById('feriaForm').reset();
        document.getElementById('feriaId').value = '';
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al cargar artesanías', 'error');
    }
}

function cancelarFormularioFeria() {
    document.getElementById('formFeria').classList.add('hidden');
    document.getElementById('feriaForm').reset();
}

async function guardarFeria(e) {
    e.preventDefault();

    const id = document.getElementById('feriaId').value;
    const productosDestacados = Array.from(document.querySelectorAll('#productosDestacados input:checked'))
        .map(cb => parseInt(cb.value));

    const datos = {
        nombre: document.getElementById('feriaNombre').value,
        ubicacion: document.getElementById('feriaUbicacion').value,
        fecha: document.getElementById('feriaFecha').value,
        productosDestacados
    };

    try {
        const url = id ? `${API_URL}/ferias/${id}` : `${API_URL}/ferias`;
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (response.ok) {
            showToast(id ? 'Feria actualizada' : 'Feria creada', 'success');
            cancelarFormularioFeria();
            cargarFerias();
        } else {
            showToast(result.errores ? result.errores.join(', ') : result.error || 'Error al guardar', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al guardar feria', 'error');
    }
}

async function editarFeria(id) {
    try {
        const response = await fetch(`${API_URL}/ferias/${id}`);
        const data = await response.json();

        if (!data.exito) {
            showToast('Feria no encontrada', 'error');
            return;
        }

        const feria = data.datos;

        // Cargar artesanías primero
        await mostrarFormularioFeria();

        // Llenar el formulario
        document.getElementById('feriaId').value = feria.id;
        document.getElementById('feriaNombre').value = feria.nombre;
        document.getElementById('feriaUbicacion').value = feria.ubicacion;
        document.getElementById('feriaFecha').value = new Date(feria.fecha).toISOString().split('T')[0];

        // Marcar productos destacados
        feria.productosDestacados.forEach(prodId => {
            const checkbox = document.getElementById(`prod_${prodId}`);
            if (checkbox) checkbox.checked = true;
        });

        document.getElementById('tituloFormFeria').textContent = 'Editar Feria';
        document.getElementById('formFeria').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al cargar feria', 'error');
    }
}

async function eliminarFeria(id) {
    if (!confirm('¿Estás seguro de eliminar esta feria?')) return;

    try {
        const response = await fetch(`${API_URL}/ferias/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Feria eliminada', 'success');
            cargarFerias();
        } else {
            showToast('Error al eliminar feria', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al eliminar feria', 'error');
    }
}
