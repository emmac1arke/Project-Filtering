const products = [
    {
      name: 'Sony Playstation 5',
      url: 'images/playstation_5.png',
      category: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung Galaxy',
      url: 'images/samsung_galaxy.png',
      category: 'smartphones',
      price: 399.99,
    },
    {
      name: 'Cannon EOS Camera',
      url: 'images/cannon_eos_camera.png',
      category: 'cameras',
      price: 749.99,
    },
    {
      name: 'Sony A7 Camera',
      url: 'images/sony_a7_camera.png',
      category: 'cameras',
      price: 1999.99,
    },
    {
      name: 'LG TV',
      url: 'images/lg_tv.png',
      category: 'televisions',
      price: 799.99,
    },
    {
      name: 'Nintendo Switch',
      url: 'images/nintendo_switch.png',
      category: 'games',
      price: 299.99,
    },
    {
      name: 'Xbox Series X',
      url: 'images/xbox_series_x.png',
      category: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung TV',
      url: 'images/samsung_tv.png',
      category: 'televisions',
      price: 1099.99,
    },
    {
      name: 'Google Pixel',
      url: 'images/google_pixel.png',
      category: 'smartphones',
      price: 499.99,
    },
    {
      name: 'Sony ZV1F Camera',
      url: 'images/sony_zv1f_camera.png',
      category: 'cameras',
      price: 799.99,
    },
    {
      name: 'Toshiba TV',
      url: 'images/toshiba_tv.png',
      category: 'televisions',
      price: 499.99,
    },
    {
      name: 'iPhone 14',
      url: 'images/iphone_14.png',
      category: 'smartphones',
      price: 999.99,
    },
  ];


  //Select DOM elements
const productsWrapper = document.getElementById('products-wrapper');
const checkboxes = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');

// Initialize cart item count
let cartItemCount = 0;

// Initialize products
const productElements = [];

//Event listeners for filtering:
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

//Loop over products and create an element for each one:
products.forEach((product) => {
const productElement = createProductElement(product);

productElements.push(productElement);
productsWrapper.appendChild(productElement)
});

//Create product element

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'item space-y-2'
    productElement.innerHTML = `<div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
    src="${product.url}" alt="${product.name}" class="w-full h-full object-cover"/>
    <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
        Add to Cart</button>
</div>
<p class="text-xl">${product.name}</p>
<strong>£${product.price.toLocaleString()}</strong>`
;


productElement.querySelector('.status').addEventListener('click', updateCart);
return productElement;
}

//Add or remove from cart
function updateCart(event) {
    const statusEl = event.target;

    if(statusEl.classList.contains('added')) {
       //remove from cart 
       statusEl.classList.remove('added');
        statusEl.innerText = 'Add to cart'  
        statusEl.classList.remove('bg-red-600');
        statusEl.classList.add('bg-gray-800');

        cartItemCount--;
    }
    else {
        //add to cart
        statusEl.classList.add('added');
        statusEl.innerText = 'Remove from cart'
        statusEl.classList.remove('bg-gray-800');
        statusEl.classList.add('bg-red-600');

        cartItemCount++;
    }

    //Update cart item count
    cartCount.innerText = cartItemCount.toString();
}

//Filter products by checkboxes and search input

// Filter products by search or checkbox
function filterProducts( ) {
    // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Get checked categories
    const checkedCategories = Array.from(checkboxes)
      .filter((check) => check.checked)
      .map((check) => check.id);
  
    // Loop over products and check for matches
    productElements.forEach((productElement, index) => {
      const product = products[index];
  
      // Check to see if product matches the search or checked items
      const matchesSearchTerm = product.price.includes(searchTerm);
      const isInCheckedCategory =
        checkedCategories.length === 0 ||
        checkedCategories.includes(product.category);
  
      // Show or hide product based on matches
      if (matchesSearchTerm && isInCheckedCategory) {
        productElement.classList.remove('hidden');
      } else {
        productElement.classList.add('hidden');
      }
    });
  }