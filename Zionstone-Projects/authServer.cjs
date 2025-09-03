const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory "database" - replace with actual DB in production
const users = {};

// JWT Secret
const JWT_SECRET = 'your-secure-jwt-secret';

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate inputs server-side
    if (!username || !email || !password) return res.status(400).json({ message: 'All fields are required' });

    if (users[username]) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { email, password: hashedPassword };

    res.status(201).json({ success: true, message: 'Registration successful' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users[username];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
});

// Forgot password - generate reset link (simplified)
app.post('/forgot-password', (req, res) => {
    const { username } = req.body;

    if (!users[username]) return res.status(404).json({ message: 'User not found' });

    const resetToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '15m' });
    // Send resetToken to user's email - here, just simulate
    res.json({ success: true, message: 'Password reset link sent.' });
});

// Middleware to protect endpoints
function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected example route
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

app.listen(3000, () => console.log('Auth server running on port 3000'));

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        // User is authenticated
        next();
    } else {
        res.status(401).send("Unauthorized: Please log in first");
    }
}

// Route to serve the booking page only if the user is authenticated
app.get("/booking", isAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/booking.html");
});

// Endpoint to handle booking form submissions
app.post("/booking", isAuthenticated, (req, res) => {
    const bookingData = req.body;

    // Here you could save booking data to a database or JSON file
    console.log("Booking data received:", bookingData);

    res.status(200).send("Booking successful!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
