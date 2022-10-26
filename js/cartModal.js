import { productsData } from "./products.js";
let cart = [];
let buttonsDOM = [];
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
		const addToCartBtn = [...document.querySelectorAll(".add-to-cart")];
		buttonsDOM = addToCartBtn;

		// console.log(buttons);
		addToCartBtn.forEach(btn => {
			const id = btn.dataset.id;

			const isInCart = cart.find((p) => p.id === parseInt(id));

			if (isInCart) {
				btn.innerText = 'In Cart';
				btn.disabled = true;
			}

			btn.addEventListener('click', (event) => {
				// console.log(event.target.dataset.id);
				event.target.innerText = "In Cart";
				btn.disabled = true;

				// 

				const addedProduct = { ...Storage.getProducts(id), quantity: 1 };
				cart = [...cart, addedProduct];
				// TODO: Add by push???
				Storage.saveCart(cart);
				this.setCartValue(cart);

				// add to cart storage
				this.addCartItem(addedProduct);
				// reload from storage
			});


		});
	}

	setCartValue(cart) {

		// calculate sum of items and total prices
		let tempCartItems = 0;
		const totalPrice = cart.reduce((acc, curr) => {
			tempCartItems += curr.quantity;
			return acc + curr.quantity * curr.price;
		}, 0);
		// console.log(totalPrice)
		// console.log(tempCartItems)
		cartTotal.innerText = `total price : ${totalPrice.toFixed(2)} $`;
		cartItems.innerText = tempCartItems;
	}

	addCartItem(item) {
		const div = document.createElement('div');
		div.classList.add("cart-item");
		div.innerHTML = `
		    	<img class="cart-itemn-image" src="${item.imageUrl}" alt="">
			    <div class="cart-item-details">
					<h4 class="item-name">${item.title}</h4>
					<p class="item-price">$ ${item.price}</p>
				</div>
				<div class="cart-item-quantity">
					<i class="fas fa-chevron-circle-up up-arrow" data-id=${item.id}></i>
					<p>${item.quantity}</p>
					<i class="fas fa-chevron-circle-down down-arrow" data-id=${item.id}></i>
				</div>
				<div class="trash">
					<i class="fas fa-trash" data-id=${item.id}></i>
				</div>`;
		cartContent.appendChild(div);
	}
	setupApp() {
		// get cart from storage
		cart = Storage.getCart() || [];
		// add items to cart modal
		cart.forEach(cartItem => this.addCartItem(cartItem));

		// calculate total
		this.setCartValue(cart)
	}
	cartLogic() {
		// Clear Cart
		clearCart.addEventListener("click", () => this.clearCart());
		cartContent.addEventListener("click", (event) => {
			console.log(event.target);

			if (event.target.classList.contains('up-arrow')) {
				console.log(event.target.dataset.id);

				const incrementedItem = event.target;
				// 1. get item from cart


				const addedItem = cart.find(cartItem => cartItem.id == incrementedItem.dataset.id);
				// update cart value
				addedItem.quantity++;
				this.setCartValue(cart);
				// save cart
				Storage.saveCart(cart);
				// update UI
				incrementedItem.nextElementSibling.innerText = addedItem.quantity;

			}
		});

	}

	clearCart() {
		// console.log("Clear");
		cart.forEach(cartItem => this.removeItem(cartItem.id));
		// console.log(cartContent.children);
		while (cartContent.children.length > 0) {
			cartContent.removeChild(cartContent.children[0]);
		}
		closeModalFunction();
	}
	removeItem(id) {
		// console.log(id);
		// cart = [];
		cart = cart.filter(item => item.id !== id)
		this.setCartValue(cart);
		Storage.saveCart(cart);

		this.getSingleButton(id);

	}

	// TODO: Rename the function
	getSingleButton(id) {
		//get add to cart btns = > change text of btns
		const btn = buttonsDOM.find(btn => btn.dataset.id == id)
		btn.innerText = "add to cart";
		btn.disabled = false;
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

	static getCart() {
		return JSON.parse(localStorage.getItem('cart'))
			? JSON.parse(localStorage.getItem('cart'))
			: [];
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
	ui.setupApp();
	ui.getAddToCartBtn();
	ui.cartLogic();
	Storage.saveProducts(productsData);
	// get carts from storage

}

// Driver 


const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products-center");
const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".cart-content");
const clearCart = document.querySelector(".clear-cart");


// Event Listeners

cartBtn.addEventListener('click', showModalFunction);
closeModal.addEventListener('click', closeModalFunction);
backDrop.addEventListener('click', closeModalFunction);
document.addEventListener('DOMContentLoaded', loader);
