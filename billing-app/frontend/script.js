document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.onsubmit = function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('http://100.115.92.195:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          window.location.href = 'admin.html';
        } else {
          alert('Login failed: ' + data.message);
        }
      })
      .catch(error => console.error('Error:', error));
    };
  } else {
    console.error('Login form element not found');
  }
});
