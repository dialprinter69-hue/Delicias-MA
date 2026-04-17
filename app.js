const MENU_URL = "https://raw.githubusercontent.com/dialprinter69-hue/delicia-menu/refs/heads/main/menu.json";

let cart = [];
let deliveryFee = 4;
let menu = [];

async function loadMenu() {
const res = await fetch(MENU_URL);
const data = await res.json();

menu = data.items;
deliveryFee = data.delivery_fee || 4;

renderMenu();
renderCart();
}

function renderMenu() {
const menuDiv = document.getElementById("menu");
menuDiv.innerHTML = "";

menu.forEach(item => {

menuDiv.innerHTML += `
<div class="card">
<img src="${item.image}" width="100" />
<h3>${item.name}</h3>
<p>$${item.price}</p>
<button onclick="addToCart('${item.name}', ${item.price})">
Add to Cart
</button>
</div>
`;

});

}

function addToCart(name, price) {
cart.push({ name, price });
renderCart();
}

function renderCart() {
const cartDiv = document.getElementById("cart-items");
const totalDiv = document.getElementById("totals");

cartDiv.innerHTML = "";

let subtotal = 0;

cart.forEach(item => {
cartDiv.innerHTML += `<p>${item.name} - $${item.price}</p>`;
subtotal += item.price;
});

let total = subtotal + deliveryFee;

totalDiv.innerHTML = `
Subtotal: $${subtotal}<br>
Delivery: $${deliveryFee}<br>
<b>Total: $${total}</b>
`;
}
