var mongoose = require("mongoose");

//itemName is a key and value will be the data entered by the user through angular
const CartItemSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemQuantity: {
    type: Number,
    required: true
  },
  itemBought: {
    type: Boolean,
    required: true
  }
});

const Item = (module.exports = mongoose.model("Item", CartItemSchema));
