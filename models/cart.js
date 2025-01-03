const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [{
    productId: String,
    name: String,
    price: Number,
    image: String,
    quantity: Number,
    productType: {
      type: String,
      required: true,
      enum: ['Product', 'Cake', 'Pie', 'Pastery', 'Dessert']
    }
  }]
});

module.exports = mongoose.model('Cart', cartSchema);