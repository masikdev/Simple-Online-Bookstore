// Modal
const btnModal = document.querySelectorAll("#modal-btn");
const btnCloseIcon = document.getElementById("close-icon");
const modalBookBox = document.querySelector(".book-modal");
const btnAddCart = document.querySelector("#add-to-cart");

// modalBtn.addEventListener("click", (e) => {});
btnModal.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    modalBookBox.classList.add("active");
    e.preventDefault();
  });
});

btnCloseIcon.addEventListener("click", (e) => {
  //   modalBookBox.style.display = "none";
  modalBookBox.classList.remove("active");
});

const modalContainer = document.querySelector(".modal-container");

document.addEventListener("click", function (e) {
  if (modalBookBox.contains(e.target) && !modalContainer.contains(e.target)) {
    modalBookBox.classList.remove("active");
  }
});

// SideMenu
const mainMenu = document.querySelector(".main-navbar");
const btnHamburger = document.getElementById("hamburger-menu");

function toggleMenu(e) {
  mainMenu.classList.toggle("active");
  e.preventDefault();
}
btnHamburger.onclick = toggleMenu;

document.addEventListener("click", (e) => {
  if (!btnHamburger.contains(e.target) && !mainMenu.contains(e.target)) {
    mainMenu.classList.remove("active");
  }
});

// Shopping Cart
const btnShoppingCart = document.getElementById("shopping-cart");
const shoppingCart = document.querySelector(".shopping-cart");

btnShoppingCart.addEventListener("click", (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
});

document.addEventListener("click", (e) => {
  if (!btnShoppingCart.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Esc Handler
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    modalBookBox.classList.remove("active");
    mainMenu.classList.remove("active");
    shoppingCart.classList.remove("active");
  }
});




