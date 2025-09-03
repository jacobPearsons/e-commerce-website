// Validation patterns
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric, 3-20 characters
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and number

// Function to sanitize inputs
function sanitizeInput(input) {
    return input.replace(/[<>\/]/g, ''); // Strips <, >, /
}

// Updated registration function with validation and sanitization
function registerUser(event) {
    event.preventDefault();
    const username = sanitizeInput(registerForm.querySelector('input[type="text"]').value);
    const email = sanitizeInput(registerForm.querySelector('input[type="email"]').value);
    const password = registerForm.querySelector('input[type="password"]').value;

    // Validate inputs
    if (!usernameRegex.test(username)) {
        alert('Invalid username. Use only letters, numbers, and underscores (3-20 characters).');
        return;
    }
    if (!emailRegex.test(email)) {
        alert('Invalid email format.');
        return;
    }
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters and include at least one letter and one number.');
        return;
    }

    // Send data to the server
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful! Please log in.');
            login(); // Switch to login form
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

	// Forgot password function
function forgotPassword(event) {
    event.preventDefault();
    const username = sanitizeInput(document.getElementById('forgotUsername').value);

    fetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message); // Password reset link sent
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simulated in-memory products database
let products = [];

// Route to add a product
app.post('/add-product', (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = { id: Date.now(), name, price, description };
    products.push(newProduct);
    res.json({ success: true, message: 'Product added!', product: newProduct });
});

// Route to view products
app.get('/view-products', (req, res) => {
    res.json(products);
});

// Route to remove a product
app.post('/remove-product', (req, res) => {
    const { id } = req.body;
    products = products.filter(product => product.id !== id);
    res.json({ success: true, message: 'Product removed!' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

async function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;

    const response = await fetch('/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, description })
    });
    const result = await response.json();
    if (result.success) {
        alert('Product added successfully!');
    } else {
        alert('Error adding product');
    }
}

async function removeProduct(productId) {
    const response = await fetch('/remove-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId })
    });
    const result = await response.json();
    if (result.success) {
        alert('Product removed successfully!');
    } else {
        alert('Error removing product');
    }
}