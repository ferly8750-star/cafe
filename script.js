
const menus = [
  { id: 1, name: "Nasi Goreng", price: 20000 },
  { id: 2, name: "Mie Goreng", price: 18000 },
  { id: 3, name: "Kentang Goreng", price: 12000 },
  { id: 4, name: "Es Teh", price: 5000 },
  { id: 5, name: "Kopi Susu", price: 15000 },
  { id: 6, name: "Cokelat Dingin", price: 13000 }
];

let cart = [];

const menuElement = document.getElementById("menu");
const cartElement = document.getElementById("cart");
const totalElement = document.getElementById("total");
const searchElement = document.getElementById("search");
const messageElement = document.getElementById("message");

const rupiah = (number) =>
  "Rp" + number.toLocaleString("id-ID");

function showMenus(keyword = "") {
  menuElement.innerHTML = "";

  const filtered = menus.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "menu-card";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = rupiah(item.price);

    const button = document.createElement("button");
    button.textContent = "Tambah ke Keranjang";
    button.addEventListener("click", () => addToCart(item.id));

    card.append(name, price, button);
    menuElement.appendChild(card);
  });
}

function addToCart(id) {
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    const menu = menus.find((item) => item.id === id);
    cart.push({ ...menu, quantity: 1 });
  }

  messageElement.textContent = "";
  showCart();
}

function showCart() {
  cartElement.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.textContent =
      `${item.name} x${item.quantity} — ` +
      rupiah(item.price * item.quantity);

    cartElement.appendChild(li);
  });

  totalElement.textContent = rupiah(total);
}

searchElement.addEventListener("input", (event) => {
  showMenus(event.target.value);
});

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    messageElement.textContent =
      "Keranjang masih kosong. Silakan pilih menu.";
    return;
  }

  const summary = cart
    .map((item) => `${item.name} x${item.quantity}`)
    .join(", ");

  messageElement.textContent =
    `Pesanan simulasi berhasil dibuat: ${summary}. ` +
    `Total ${totalElement.textContent}.`;

  cart = [];
  showCart();
});

showMenus();
showCart();
