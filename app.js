// Sample Data
let items = [
  { id: 1, name: "Red Jacket", category: "Outerwear", purpose: "Swap" },
  { id: 2, name: "Blue Jeans", category: "Bottoms", purpose: "Donate" },
  { id: 3, name: "Black Dress", category: "Formal", purpose: "Swap" }
];

// DOM Elements
const registrationForm = document.getElementById('registration-form');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const itemList = document.getElementById('item-list');
const itemOptions = document.getElementById('item-options');
const logoutBtn = document.getElementById('logout-btn');
const donateBtn = document.getElementById('donate-btn');
const swapBtn = document.getElementById('swap-btn');
const borrowBtn = document.getElementById('borrow-btn');

// Registration Form
document.getElementById('register-form').addEventListener('submit', (e) => {
e.preventDefault();
const username = document.getElementById('username').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

fetch('http://localhost:5000/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, email, password })
})
.then(response => {
  console.log('Response:', response);  // Log the response
  if (!response.ok) {
    return response.json().then(data => {
      throw new Error(data.message || 'Something went wrong');
    });
  }
  return response.json();  // If response is ok, parse as JSON
})
.then(data => alert(data.message))
.catch(error => console.error('Registration Error:', error));
});

// Login Form
document.getElementById('login-form').addEventListener('submit', (e) => {
e.preventDefault();
const username = document.getElementById('login-username').value;
const password = document.getElementById('login-password').value;

fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password })
})
.then(response => {
  console.log('Response:', response);  // Log the response
  if (!response.ok) {
    return response.json().then(data => {
      throw new Error(data.message || 'Something went wrong');
    });
  }
  return response.json();  // If response is ok, parse as JSON
})
.then(data => {
  if (data.message === "Login successful!") {
    loginForm.classList.remove('active');
    itemOptions.classList.add('active');
    showItems();
  } else {
    loginError.style.display = 'block';
  }
})
.catch(error => console.error('Login Error:', error));
});

// Show Available Items
function showItems() {
const itemListDiv = document.getElementById('items');
itemListDiv.innerHTML = '';
items.forEach(item => {
  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');
  itemCard.innerHTML = `
    <div class="item-details">
      <h3>${item.name}</h3>
      <p>Category: ${item.category}</p>
      <p>Purpose: ${item.purpose}</p>
    </div>
  `;
  itemListDiv.appendChild(itemCard);
});
}

// Logout
logoutBtn.addEventListener('click', () => {
itemOptions.classList.remove('active');
registrationForm.classList.add('active');
});
