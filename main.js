/**
 * navigation
 */
function navigateTo(page) {
  window.location = page;
}

function openWhatsapp() {
  window.open("https://wa.me/4917632854727", "_blank");
}

/**
 * cart logic (localStorage)
 */
let cart = JSON.parse(localStorage.getItem("customCart") || "[]");

function saveCart() {
  localStorage.setItem("customCart", JSON.stringify(cart));
}

function updateBadge() {
  const count = cart.reduce((s,i) => s + i.quantity, 0);
  document.querySelectorAll("#sepetBadge").forEach(el => {
    el.innerText = count > 0 ? count : "";
  });
}

function addToCart(id,name,price,image) {
  const found = cart.find(item => item._id === id);
  if (found) found.quantity++;
  else cart.push({_id:id,name,price,image,quantity:1});
  saveCart();
  updateBadge();
  alert(name + " sepete eklendi!");
}

function loadCartPage() {
  const tbody = document.getElementById("cartBody");
  tbody.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price*item.quantity;
    tbody.innerHTML += `
      <tr>
        <td><img src="${item.image}" width="40"> ${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(4)} €</td>
        <td>${(item.price*item.quantity).toFixed(4)} €</td>
      </tr>
    `;
  });
  document.getElementById("cartTotal").innerText = total.toFixed(4) + " €";
}

updateBadge();
if (document.getElementById("cartBody")) loadCartPage();

/**
 * hesaplama
 */
function hesaplaFiyat() {
  const miktar = Number(document.getElementById("miktar").value);
  const unit = Number(document.getElementById("tip").value);
  const sonuc = miktar*unit;
  document.getElementById("displaySonuc").innerText = 
    sonuc.toLocaleString("de-DE",{style:"currency",currency:"EUR"});
}

/**
 * contact form
 */
function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById("formName").value;
  const email = document.getElementById("formEmail").value;
  const message = document.getElementById("formMessage").value;
  document.getElementById("formResult").innerText = 
    "Mesajınız alındı! Teşekkür ederiz 😊";
  document.getElementById("contactForm").reset();
}
