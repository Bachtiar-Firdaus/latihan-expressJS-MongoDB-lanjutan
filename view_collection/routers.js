const express = require("express");
const routers = express.Router();

// const client = require('./connection')
const multer = require("multer");

require("./connection");
const Product = require("./Product");

routers.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send({
      status: "success",
      message: "list products ditemukan",
      data: products,
    });
  } else {
    res.send({
      status: "success",
      message: "list products tidak ditemukan",
    });
  }
});
module.exports = routers;
