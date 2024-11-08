const express = require('express');
const mongoose = require('mongoose');
//use it for local development
//const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
//for vercel deployment
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//use it for local development
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs'); // Set view engine

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


// Routes
app.use('/api/auth', authRoutes);

// Render home, register, and login pages
app.get('/', (req, res) => res.render('index'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));

// Protected route example
app.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard', { user: req.user });
  });

// Start server on localhost:3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


module.exports = app;
