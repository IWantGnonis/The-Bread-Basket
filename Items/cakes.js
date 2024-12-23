const mongoose = require('mongoose');
const Cake = require('../models/cakes-schema');

mongoose.connect('mongodb://localhost:27017/simple-cart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Cakes = [
  { name: 'RoundCake', price: 10, image:'https://images.unsplash.com/photo-1508736375612-66c03035c629?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',desc:"Ingredients: Flour, sugar, butter, eggs, milk, baking powder, vanilla extract (for cake); powdered sugar, butter, milk, vanilla extract (for frosting)." },
  { name: 'Cupcake', price: 20, image:'https://images.unsplash.com/photo-1610306212789-7508d076e925?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',desc:"Ingredients: Flour, sugar, butter, eggs, milk, baking powder, vanilla extract (for cupcake); powdered sugar, butter, milk, vanilla extract (for icing)." },
  { name: 'Chicken Shawarma', price: 30,image:'https://images.unsplash.com/photo-1676300185983-d5f242babe34?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',desc:"Ingredients:Cream cheese, sugar, eggs, vanilla extract (for cheesecake); graham crackers, butter (for crust)." },
];


Cake.insertMany(Cakes)
  .then(() => {
    console.log('Products added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
