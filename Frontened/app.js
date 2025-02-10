const apiBaseUrl = 'http://localhost:5001';

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`${apiBaseUrl}/register.php`, {
    method: 'POST',
    body: JSON.stringify({
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  }).then(res => res.json()).then(data => alert(data.message));
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`${apiBaseUrl}/login.php`, {
    method: 'POST',
    body: JSON.stringify({
      username: document.getElementById('login-username').value,
      password: document.getElementById('login-password').value
    })
  }).then(res => res.json()).then(data => alert(data.message));
});
