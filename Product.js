const mongoose = require("mongoose");

//Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field Nama Harus Ada"],
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 1000000,
  },
  stock: Number,
  status: { type: Boolean, default: true },
});

//Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
