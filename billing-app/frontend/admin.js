document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    const userForm = document.getElementById('add-user-form');
    if (userForm) {
      userForm.onsubmit = function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
  
        fetch('http://100.115.92.195:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ username, password, role })
        })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            alert('User added successfully');
          } else {
            alert('Error: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
          alert('An error occurred: ' + error.message);
        });
      };
    } else {
      console.error('User form element not found');
    }
  
    const productForm = document.getElementById('add-product-form');
    if (productForm) {
      productForm.onsubmit = function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const company = document.getElementById('company').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;
  
        fetch('http://100.115.92.195:3000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name, company, price, stock })
        })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            alert('Product added successfully');
          } else {
            alert('Error: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
          alert('An error occurred: ' + error.message);
        });
      };
    } else {
      console.error('Product form element not found');
    }
  
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
      logoutButton.onclick = function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
      };
    } else {
      console.error('Logout button element not found');
    }
  });
  