const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt')

const User = require('./models/user');

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

app.get('/stores',(rep,res)=>{
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
app.get('/shop', async (req, res) => {
  try {
    const breads = await Product.find({});
    const cakes = await Cake.find({});
    const pies = await Pie.find({});
    const pasteries = await Pastery.find({});
    const desserts = await Dessert.find({});
    
    res.render('shop', {
      breads,
      cakes, 
      pies,
      pasteries,
      desserts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error loading shop page');
  }
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

// Add to Cart


// View Cart


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

// Add to Cart route
app.post('/add-to-cart', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      // Find product across all collections
      const product = await findProductInCollections(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: parseInt(quantity),
        productType: product.constructor.modelName
      });
    }

    // Calculate total
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// View Cart route with explicit data passing
app.get('/basket', async (req, res) => {
  try {
    const cart = await Cart.findOne();
    const cartData = {
      items: cart ? cart.items : [],
      total: cart ? cart.total : 0,
      itemCount: cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0
    };
    res.render('basket', { cart: cartData });
  } catch (error) {
    console.log('Error fetching cart:', error);
    res.render('basket', { cart: { items: [], total: 0, itemCount: 0 } });
  }
});

async function findProductInCollections(productId) {
  const collections = [Product, Cake, Pie, Pastery, Dessert];
  for (const Collection of collections) {
    const product = await Collection.findById(productId);
    if (product) return product;
  }
  return null;
}

app.put('/update-cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne();
    
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      
      cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await cart.save();
      res.json({ success: true, cart });
    } else {
      res.status(404).json({ success: false, message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
