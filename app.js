const MENU_URL = "https://raw.githubusercontent.com/dialprinter69-hue/delicia-menu/refs/heads/main/menu.json";

let cart = [];
let menu = [];
let deliveryFee = 4;

async function loadMenu() {
try {
const res = await fetch(MENU_URL);
const data = await res.json();

console.log("MENU DATA:", data);

menu = data.items || [];
deliveryFee = data.delivery_fee || 4;

renderMenu();
updateCartBar();

} catch (error) {
console.error("Error loading menu:", error);
document.getElementById("menu").innerHTML =
"<p style='padding:20px'>Error loading menu ❌</p>";
}
}

function renderMenu() {
const menuDiv = document.getElementById("menu");

if (!menuDiv) {
console.error("MENU DIV NOT FOUND");
return;
}

menuDiv.innerHTML = "";

menu.forEach((item, index) => {

menuDiv.innerHTML += `
<div class="card">
<img src="${item.image || 'https://via.placeholder.com/150'}">
<h3>${item.name}</h3>
<p>$${item.price}</p>
<button onclick="addToCart(${index})">Add</button>
</div>
`;

});
}

function addToCart(index) {
cart.push(menu[index]);
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
let msg = "🍰 New Order:%0A%0A";
let subtotal = 0;

cart.forEach(i => {
msg += `${i.name} - $${i.price}%0A`;
subtotal += i.price;
});

let total = subtotal + deliveryFee;

msg += `%0ADelivery: $${deliveryFee}%0ATotal: $${total}`;

window.open(`https://wa.me/19786022790?text=${msg}`);
}

loadMenu();
