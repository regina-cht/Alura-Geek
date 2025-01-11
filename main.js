const productsGallery = document.getElementById('productsGallery');
const productForm = document.getElementById('productForm');

// Producto base
const baseProducts = [
  {
    name: 'Game Boy Classic',
    price: '$60.00',
    image: 'assets/Foto_1.png', // Asegúrate de agregar la extensión .png en la ruta
  },
];

// Inicializar Local Storage si está vacío
function initializeLocalStorage() {
  const storedProducts = JSON.parse(localStorage.getItem('products'));
  if (!storedProducts || storedProducts.length === 0) {
    localStorage.setItem('products', JSON.stringify(baseProducts));
  }
}

// Función para formatear el precio
function formatPrice(price) {
  const priceNumber = parseFloat(price.replace('$', '').trim());
  return `$${priceNumber.toFixed(2)}`;
}

// Cargar productos desde Local Storage
function loadProducts() {
  const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
  renderProducts(storedProducts);
}

// Renderizar productos en la galería
function renderProducts(products) {
  productsGallery.innerHTML = ''; // Limpiar galería
  products.forEach((product, index) => {
    const productCard = document.createElement('article');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <div class="product-card__image-container">
        <img class="product-card__image" src="${product.image}" alt="${
      product.name
    }">
      </div>
      <p class="product-card__title">${product.name}</p>
      <div class="product-card__price">
        <p class="product-card__price-tag">${formatPrice(product.price)}</p>
        <img class="product-card__icon" src="assets/Basura.png" alt="Eliminar producto" data-index="${index}">
      </div>
    `;
    productsGallery.appendChild(productCard);
  });

  // Asignar eventos de eliminación
  const deleteIcons = document.querySelectorAll('.product-card__icon');
  deleteIcons.forEach((icon) =>
    icon.addEventListener('click', (event) =>
      deleteProduct(event.target.dataset.index)
    )
  );
}

// Manejar envío del formulario
productForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const price = document.getElementById('productPrice').value.trim();
  const image = document.getElementById('productImage').value.trim();

  if (name && price && image) {
    const formattedPrice = formatPrice(price); // Formatear el precio
    const newProduct = { name, price: formattedPrice, image };
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(storedProducts));
    renderProducts(storedProducts);
    productForm.reset();
  } else {
    alert('Por favor, completa todos los campos.');
  }
});

// Eliminar producto
function deleteProduct(index) {
  const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
  storedProducts.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(storedProducts));
  renderProducts(storedProducts);
}

// Inicializar Local Storage y cargar productos iniciales
initializeLocalStorage();
loadProducts();
