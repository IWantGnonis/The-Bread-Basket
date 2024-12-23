const mongoose = require('mongoose');
const Pie = require('../models/pies-schema');

mongoose.connect('mongodb://localhost:27017/simple-cart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Pies = [
  { name: 'RoundCake', price: 10, image:'https://images.unsplash.com/photo-1508736375612-66c03035c629?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',desc:"Ingredients: Flour, sugar, butter, eggs, milk, baking powder, vanilla extract (for cake); powdered sugar, butter, milk, vanilla extract (for frosting)." },
  { name: 'Sourdough bread', price: 20, image:'https://images.pexels.com/photos/17988096/pexels-photo-17988096/free-photo-of-close-up-of-bread.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { name: 'Chicken Shawarma', price: 30,image:'https://the-cooking-studio.com/wp-content/uploads/2021/03/pita.jpg' },
];


Pie.insertMany(Pies)
  .then(() => {
    console.log('Products added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
