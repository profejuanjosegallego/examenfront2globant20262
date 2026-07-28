// 1. Selección de elementos del DOM
const productContainer = document.getElementById('productContainer');
const productCount = document.getElementById('productCount');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const btnToggleView = document.getElementById('btnToggleView');
const btnAvailable = document.getElementById('btnAvailable');

// Variable de estado para controlar la vista (Tarjetas o Tabla)
let isTableView = false;

// 2. Función para filtrar productos (Búsqueda + Categoría)
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = productos.filter(producto => {
        const matchesName = producto.nombre.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'Todos' || producto.categoria === selectedCategory;
        return matchesName && matchesCategory;
    });

    renderProducts(filtered);
}

// 3. Función para renderizar productos (Tabla o Tarjetas)
function renderProducts(productsToRender) {
    // Limpieza 100% segura mediante manipulación del DOM
    while (productContainer.firstChild) {
        productContainer.removeChild(productContainer.firstChild);
    }
    
    // Actualizamos el contador
    if (productCount) {
        productCount.textContent = productsToRender.length;
    }

    // Evaluación de la vista actual
    if (isTableView) {
        // --- RENDERIZADO DE TABLA ---
        productContainer.classList.remove('product-grid');

        const table = document.createElement('table');
        table.classList.add('product-table');

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        productsToRender.forEach(producto => {
            const tr = document.createElement('tr');
            const estadoTexto = producto.disponible ? 'Disponible' : 'Agotado';

            tr.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>${producto.marca}</td>
                <td>$${producto.precio.toLocaleString('es-CO')}</td>
                <td>${producto.stock}</td>
                <td class="${producto.disponible ? 'disponible' : 'agotado'}">${estadoTexto}</td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        productContainer.appendChild(table);

    } else {
        // --- RENDERIZADO DE TARJETAS ---
        productContainer.classList.add('product-grid');

        productsToRender.forEach(producto => {
            const card = document.createElement('article');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            img.classList.add('card-img');

            const title = document.createElement('h3');
            title.textContent = producto.nombre;
            title.classList.add('card-title');

            const brand = document.createElement('p');
            brand.textContent = `Marca: ${producto.marca}`;
            brand.classList.add('card-brand');

            const category = document.createElement('p');
            category.textContent = `Categoría: ${producto.categoria}`;
            category.classList.add('card-category');

            const price = document.createElement('p');
            price.textContent = `$${producto.precio.toLocaleString('es-CO')}`;
            price.classList.add('card-price');

            const stock = document.createElement('p');
            stock.textContent = `Stock: ${producto.stock} uds.`;
            stock.classList.add('card-stock');

            const status = document.createElement('span');
            status.classList.add('status');
            if (producto.disponible) {
                status.textContent = 'Disponible';
                status.classList.add('disponible');
            } else {
                status.textContent = 'Agotado';
                status.classList.add('agotado');
            }

            card.append(img, title, brand, category, price, stock, status);
            productContainer.appendChild(card);
        });
    }
}

// 4. Asignación de Eventos del DOM
if (searchInput) searchInput.addEventListener('input', filterProducts);
if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);

if (btnToggleView) {
    btnToggleView.addEventListener('click', () => {
        isTableView = !isTableView;
        btnToggleView.textContent = isTableView ? 'Ver en Tarjetas' : 'Ver en Tabla';
        filterProducts();
    });
}

if (btnAvailable) {
    btnAvailable.addEventListener('click', () => {
        const disponibles = productos.filter(p => p.disponible);
        renderProducts(disponibles);
    });
}

// 5. Carga inicial cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productos);
});