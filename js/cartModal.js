import { productsData } from "./products.js";


// Classes

class Products {
	getProducts() {
		return productsData;
	}
}

// Display products
class UI {
	displayProducts(products) {
		let result = '';
		products.forEach(item => {
			result += `<article class="product">
            <div class="img-container">
							<img class="product-image" src="${item.imageUrl}" alt="Product 1">
            </div>
            <div class="product-desc">
							<p class="product-title">Product Title: ${item.title}</p>
							<p class="product-price">$ ${item.price}</p>
            </div>
            <button class="btn add-to-cart" data-id=${item.id}>
							<i class="fas fa-shopping-cart"></i> add to cart
            </button>
        </article>`;
		});
		productsDOM.innerHTML = result;
	}

	getAddToCartBtn() {
		const addToCartBtn = document.querySelectorAll(".add-to-cart");
		// console.log(addToCartBtn);
		const buttons = [...addToCartBtn];
		// console.log(buttons);
		buttons.forEach(btn => {
			const id = btn.dataset.id;
			// console.log(id);
			const isInCart = cart.find(p => p.id === id);

			if (isInCart) {
				btn.innerText = 'In Cart';
				btn.disabled = true;
			}
			else {
				btn.addEventListener('click', (event) => {
					// console.log(event.target.dataset.id);
					event.target.innerText = "In Cart";
					btn.disabled = true;
					const addedProduct = Storage.getProducts(id);
					cart = [...cart, { ...addedProduct, quantity: 1 }];
					// TODO: Add by push???
					Storage.saveCart(cart);

				});
			}

		});
	}
}

// Storage Managements
class Storage {
	static saveProducts(products) {
		localStorage.setItem("products", JSON.stringify(products));
	}

	static getProducts(id) {
		const _products = JSON.parse(localStorage.getItem('products'));
		// console.log(_products);
		// console.log(_products.find(p => p.id == id))
		return _products.find(p => p.id == id);
	}
	static saveCart(cart) {
		localStorage.setItem("cart", JSON.stringify(cart));
	}
}



// Functions
function showModalFunction() {
	backDrop.style.display = "block";
	cartModal.style.opacity = "1";
	cartModal.style.top = "20%";
}

function closeModalFunction() {
	backDrop.style.display = "none";
	cartModal.style.top = "-100%";
	cartModal.style.opacity = "0";
}

function loader() {
	const products = new Products();
	const productsData = products.getProducts();

	const ui = new UI();
	ui.displayProducts(productsData);
	ui.getAddToCartBtn();
	Storage.saveProducts(productsData);
}

// Driver 
let cart = [];

const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products-center");


// Event Listeners

cartBtn.addEventListener('click', showModalFunction);
closeModal.addEventListener('click', closeModalFunction);
backDrop.addEventListener('click', closeModalFunction);
document.addEventListener('DOMContentLoaded', loader);
