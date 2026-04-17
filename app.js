const MENU_URL = "https://raw.githubusercontent.com/dialprinter69-hue/delicia-menu/refs/heads/main/menu.json";

let cart = [];
let menu = [];
let deliveryFee = 4;

async function loadMenu() {
const res = await fetch(MENU_URL);
const data = await res.json();

menu = data.items;
deliveryFee = data.delivery_fee || 4;

renderMenu();
updateCartBar();
}

function renderMenu() {
const menuDiv = document.getElementById("menu");
menuDiv.innerHTML = "";

menu.forEach((item, index) => {
menuDiv.innerHTML += `
<div class="card">
<img src="${item.image || 'https://via.placeholder.com/150'}">
<h3>${item.name}</h3>
<p>$${item.price}</p>
<button id="btn-${index}" onclick="addToCart(${index})">
Add
</button>
</div>
`;
});
}

function addToCart(index) {
cart.push(menu[index]);

const btn = document.getElementById("btn-" + index);
btn.innerText = "Added ✓";
btn.style.background = "#4CAF50";

updateCartBar();
}

function updateCartBar() {
const bar = document.getElementById("cart-bar");

let subtotal = 0;
cart.forEach(i => subtotal += i.price);

let total = subtotal + deliveryFee;

bar.innerHTML = `
🛒 Items: ${cart.length} | Total: $${total}
<button onclick="checkout()">Checkout</button>
`;
}

function checkout() {
let subtotal = 0;
let msg = "🍰 New Order:%0A%0A";

cart.forEach(i => {
msg += `${i.name} - $${i.price}%0A`;
subtotal += i.price;
});

let total = subtotal + deliveryFee;

msg += `%0ADelivery: $${deliveryFee}%0ATotal: $${total}`;

window.open(`https://wa.me/19786022790?text=${msg}`);
}

loadMenu();
