const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt')

const User = require('./models/User');

const Product = require('./models/bread-schema');
const Cake = require('./models/cakes-schema');
const Pie = require('./models/pies-schema');
const Pastery = require('./models/pastery-schema');
const Dessert = require('./models/desserts-schema');

const Cart = require('./models/cart');
const Config = require('./models/config');

const app = express();
const path = require('path')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

app.get('/store',(rep,res)=>{
  res.render("store");
});
app.get('/about',(rep,res)=>{
  res.render("about");
});

app.post('/stores',(rep,res)=>{
  res.render("store");
});
app.post('/about',(rep,res)=>{
  res.render("about");
});
app.post('/', (req, res) => {
  res.render('index');
});
app.get('/', (req, res) => {
  res.render('index');
});
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/simple-cart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useCreateIndex: true
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page
app.get('/shop', async (req, res) => {
  const products = await Product.find();
  const Cakes = await Cake.find();
  const Pasterys = await Pastery.find();
  const Pies = await Pie.find();
  const Desserts = await Dessert.find();

  res.render('shop/shop', { products, Cakes, Pasterys, Pies, Desserts});
});

// Add to Cart
app.post('/add-to-cart/:id', async (req, res) => {
  const productId = req.params.id;
  const cart = await Cart.findOne() || new Cart({ items: [] });

  const item = cart.items.find(i => i.productId.equals(productId));
  if (item) {
    item.quantity += 1;
  } else {
    cart.items.push({ productId, quantity: 1 });
  }

  await cart.save();
  res.redirect('/shop');
});

// View Cart
app.get('/basket', async (req, res) => {
  const cart = await Cart.findOne().populate('items.productId');
  res.render('basket', { cart });
});

//Remove Items From Cart

//Signup
app.get('/signup', (req, res) => {
  res.render('signup', { error: null, success: null, username: '', email: '' });
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.render('signup', {
        error: 'All fields are required.',
        success: null,
        username,
        email,
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', {
        error: 'Email is already registered.',
        success: null,
        username,
        email,
      });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Render success message
    res.redirect('/signin');
  } catch (error) {
    res.render('signup', {
      error: 'Error registering user. Please try again.',
      success: null,
      username,
      email,
    });
  }
});








//Signin
app.get('/signin', (req, res) => {
  res.render('signin', { error: null, success: null, email: '' });
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Basic validation
    if (!email || !password) {
      return res.render('signin', {
        error: 'Email and password are required',
        success: null,
        email
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.render('signin', {
        error: 'Email not found',
        success: null,
        email
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('signin', {
        error: 'Invalid password',
        success: null,
        email
      });
    }

    // Set session


    // Redirect to home page after successful login
    res.redirect('/');

  } catch (error) {
    console.error('Signin error:', error);
    return res.render('signin', {
      error: 'An error occurred during sign in',
      success: null,
      email
    });
  }
});







app.listen(3000)