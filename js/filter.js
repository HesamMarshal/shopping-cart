
// API ADDRESS: http://localhost:3000/items

// Functions:
function renderProducts(products, filter) {
    const filteredProducts = products.filter(p => {

        return p.title.toLowerCase().includes(filter.searchItems.toLowerCase());
    });
    console.log("renderProducts: ", filteredProducts);
    productsCenter.innerHTML = "";
    filteredProducts.forEach(item => {
        // create 
        const productDiv = document.createElement('div');
        productDiv.classList.add("product")

        // create content
        productDiv.innerHTML = `  
                <div class="img-container">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="product-desc">
                    <p class="product-price">${item.price}$</p>
                    <p class="product-title">${item.title}</p>
                </div>`;
        // add to DOM

        productsCenter.appendChild(productDiv);

    })

}

// Golbal Variales
let allProductsData = [];
const filters = {
    searchItems: "",
};

const searchInput = document.querySelector("#search");
const productsCenter = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");

// filter based on category
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.dataset.filter);

        filters.searchItems = e.target.dataset.filter;
        renderProducts(allProductsData, filters)
    });
});

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {

    axios
        .get("http://localhost:3000/items")
        .then((res) => {
            console.log("DOMContentLoaded:", res.data)
            allProductsData = res.data;

            // Render products 
            renderProducts(res.data, filters);

            // render to DOM
        })
        .catch((err) => console.log(err));

});

searchInput.addEventListener('input', (e) => {
    console.log("search input: ", e.target.value);
    filters.searchItems = e.target.value;
    renderProducts(allProductsData, filters);
});


