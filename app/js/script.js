window.onload = chageCartContent();

// Toggle open class from header tag
document.querySelector(".humburger_menu").addEventListener("click", () => {
    document.querySelector("div.nav").classList.toggle("open");
});

// Increase/decrease Item counter
const itemCounter = document.querySelector(".items-counter");
const addBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

addBtn.addEventListener("click", () => {
    itemCounter.textContent++;
});

decreaseBtn.addEventListener("click", () => {
    if (itemCounter.textContent > 0) {
        itemCounter.textContent--;
    } else {
        return;
    }
});

// Add Item(s) to cart
const addToCartBtn = document.querySelector(".add-to-cart");
addToCartBtn.addEventListener("click", () => {
    if (itemCounter.textContent > 0) {
        saveItemToCart();
    } else {
        return;
    }
});

// Show/hide cart items
const megaMenu = document.querySelector(".profile_cart__cart_content");
document.addEventListener("click", (e) => {
    if (e.target.matches(".profile_cart__cart_container")) {
        megaMenu.classList.toggle("active");
    } else if (e.target.closest(".profile_cart__cart_content")) {
        return;
    } else {
        megaMenu.classList.remove("active");
    }
});

// Open/Close Product Images Popup
const popupContainer = document.querySelector(".popup-product-images");
document.querySelector(".product_img").addEventListener("click", () => {
    popupContainer.classList.add("active");
});

document.querySelector("div.x-ic button").addEventListener("click", () => {
    popupContainer.classList.remove("active");
});

function saveItemToCart() {
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", itemCounter.textContent);
        itemCounter.textContent = 0;
    } else {
        let oldCart = localStorage.getItem("cart");
        localStorage.setItem(
            "cart",
            String(+oldCart + +itemCounter.textContent)
        );
        itemCounter.textContent = 0;
    }

    chageCartContent();
}

function chageCartContent() {
    let cartContainer = document.querySelector(
        ".profile_cart__cart_content__container"
    );

    let cartBadge = document.querySelector(
        ".profile_cart__cart_container > span"
    );

    if (localStorage.getItem("cart")) {
        cartContainer.innerHTML = `
        <h3>Cart</h3>

        <div class="profile_cart__cart_content__container__items">
        <img src="images/image-product-1-thumbnail.jpg" alt="product thumbnail" />
        <div class="profile_cart__cart_content__container__items__details" >
        <p>Fall Limited Edition Sneakers</p>
        <p>$125.00 x ${localStorage.getItem("cart")} <span>$${
            125 * Number(localStorage.getItem("cart"))
        }</span></p>
        </div>
        <img src="images/icon-delete.svg" alt="delete icon" id="delete-ic" />
        </div>
        
        <button>Checkout</button>
        `;

        cartBadge.style.display = "block";
        cartBadge.textContent = localStorage.getItem("cart");

        cartContainer
            .querySelector("#delete-ic")
            .addEventListener("click", () => {
                localStorage.removeItem("cart");
                chageCartContent();
            });
    } else {
        cartContainer.innerHTML = `<h3>Cart</h3><p>Cart Is Empty</p>`;
        cartBadge.style.display = "none";
    }
}

// Remove active class from all thumbnails
function removeActiveClass() {
    thumbnailsContainer.forEach((el) => {
        el.classList.remove("active");
    });
}

// Change Product Image By Clicking on the product thumbnail image
var productImgs = Array.from(document.querySelectorAll(".product_img"));
const thumbnailsContainer = Array.from(
    document.querySelectorAll(".thumbnails > div")
);

thumbnailsContainer.forEach((el) => {
    el.addEventListener("click", () => {
        removeActiveClass();
        document
            .querySelectorAll(
                `div.thumbnail[data-index="${el.getAttribute("data-index")}"]`
            )
            .forEach((thmub) => {
                thmub.classList.add("active");
            });

        productImgs.forEach((img) => {
            img.src = el.firstElementChild
                .getAttribute("src")
                .replace("-thumbnail", "");
        });
    });
});

// next & previous buttons functionalities
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
    let activeEl = document.querySelector("div.active.thumbnail");
    removeActiveClass();

    if (+activeEl.dataset.index < 4) {
        nextActiveElIndex = +activeEl.dataset.index + 1;
    } else {
        nextActiveElIndex = 1;
    }
    nextActiveEl = document.querySelectorAll(
        `div.thumbnail[data-index="${nextActiveElIndex}"]`
    );

    nextActiveEl.forEach((thumb) => {
        thumb.classList.add("active");
    });

    productImgs.forEach((img) => {
        img.src = nextActiveEl[0].firstElementChild
            .getAttribute("src")
            .replace("-thumbnail", "");
    });
});

const previousBtn = document.querySelector(".previous-btn");
previousBtn.addEventListener("click", () => {
    let activeEl = document.querySelector("div.active.thumbnail");
    removeActiveClass();

    if (+activeEl.dataset.index > 1) {
        previousActiveElIndex = +activeEl.dataset.index - 1;
    } else {
        previousActiveElIndex = 4;
    }
    previousActiveEl = document.querySelectorAll(
        `div.thumbnail[data-index="${previousActiveElIndex}"]`
    );

    previousActiveEl.forEach((thumb) => {
        thumb.classList.add("active");
    });

    productImgs.forEach((img) => {
        img.src = previousActiveEl[0].firstElementChild
            .getAttribute("src")
            .replace("-thumbnail", "");
    });
});
