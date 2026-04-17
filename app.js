const MENU_URL =
"https://raw.githubusercontent.com/dialprinter69-hue/delicia-menu/refs/heads/main/menu.json";

let cart = [];
let deliveryFee = 4;
let menuData = [];

async function loadMenu() {
const res = await fetch(MENU_URL);
const data = await res.json();

menuData = data.items || data;
deliveryFee = data.delivery_fee || 4;

renderMenu();
}

function renderMenu() {
const menuDiv = document.getElementById("menu");

menuData.forEach(item => {
const div = document.createElement("div");
div.className = "card";

div.innerHTML = `
<h3>${item.name}</h3>
<p>$${item.price}</p>
<button onclick="addToCart('${item.name}', ${item.price})">Add</button>
`;

menuDiv.appendChild(div);
});
}

function addToCart(name, price) {
cart.push({ name, price });
renderCart();
}

function renderCart() {
const container = document.getElementById("cart-items");
container.innerHTML = "";

let subtotal = 0;

cart.forEach(i => {
subtotal += i.price;
container.innerHTML += `<p>${i.name} - $${i.price}</p>`;
});

let total = subtotal + deliveryFee;

document.getElementById("totals").innerText =
`Subtotal: $${subtotal} | Delivery: $${deliveryFee} | Total: $${total}`;
}

function sendWhatsApp() {
let msg = "New Order:%0A";
let subtotal = 0;

cart.forEach(i => {
msg += `${i.name} - $${i.price}%0A`;
subtotal += i.price;
});

let total = subtotal + deliveryFee;

msg += `%0ADelivery: $${deliveryFee}%0ATotal: $${total}`;

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const address = document.getElementById("address").value;

msg += `%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;

window.open(`https://wa.me/19786022790?text=${msg}`);
}

function payCashApp() {
let subtotal = 0;
cart.forEach(i => subtotal += i.price);

let total = subtotal + deliveryFee;

window.open(`https://cash.app/$YOURUSERNAME/${total}`);
}

loadMenu();
