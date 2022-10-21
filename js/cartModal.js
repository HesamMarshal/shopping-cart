const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");


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

// console.log("CartModal.js")


cartBtn.addEventListener('click', showModalFunction);
closeModal.addEventListener('click', closeModalFunction);
backDrop.addEventListener('click', closeModalFunction);