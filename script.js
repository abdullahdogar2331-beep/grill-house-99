// ================================
// GRILL HOUSE 99 - CART SYSTEM
// ================================

let cart = [];


// Add item to cart
function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    showCartMessage(name);
}


// Update cart
function updateCart() {

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const countElement = document.getElementById("cartCount");

    if (countElement) {
        countElement.textContent = cartCount;
    }

    renderCart();
}


// Render cart items
function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>Rs. ${item.price} × ${item.quantity}</p>
            </div>

            <div class="cart-item-controls">
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = "Rs. " + total.toLocaleString();
}


// Change quantity
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


// Open cart
function openCart() {

    const cartPanel = document.getElementById("cartPanel");

    if (cartPanel) {
        cartPanel.classList.add("open");
    }
}


// Close cart
function closeCart() {

    const cartPanel = document.getElementById("cartPanel");

    if (cartPanel) {
        cartPanel.classList.remove("open");
    }
}


// Small notification
function showCartMessage(name) {

    const message = document.createElement("div");

    message.className = "cart-message";

    message.textContent = name + " added to cart ✓";

    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 2000);
}


// Connect menu buttons
document.addEventListener("DOMContentLoaded", () => {

    const orderButtons = document.querySelectorAll(
        ".menu-content a"
    );

    orderButtons.forEach(button => {

        button.addEventListener("click", function(event) {

            event.preventDefault();

            const card = this.closest(".menu-card");

            const name = card.querySelector("h3").textContent;

            const priceText =
                card.querySelector(".menu-title span").textContent;

            const price = Number(
                priceText.replace(/[^0-9]/g, "")
            );

            addToCart(name, price);
            openCart();
        });
    });

});
