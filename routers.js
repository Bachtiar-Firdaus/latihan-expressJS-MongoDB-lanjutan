const express = require("express");
const routers = express.Router();
const cors = require("cors");

// const client = require('./connection')
const multer = require("multer");

require("./connection");
const Product = require("./Product");

//menampilkan data collection (routing list products)
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

//mengupdate Routing find singgle product ke id
routers.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  if (product) {
    res.send({
      status: "success",
      message: "single product ditemukan",
      data: product,
    });
  } else {
    res.send({
      status: "warning",
      message: "single product tidak ditemukan",
    });
  }
});

//mengupdate routing create menggunakan req body
routers.post("/product", multer().none(), async (req, res) => {
  const { name, price, stock, status } = req.body;
  try {
    const product = await Product.create({
      name: name,
      price: price,
      stock: stock,
      status: status,
    });
    if (product) {
      res.send({
        status: "success",
        message: "tambah product success",
        data: product,
      });
    } else {
      res.send({
        status: "warning",
        message: "tambah product gagal",
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});

//mengupdate routing update product dengan methode put
routers.put("/product/:id", multer().none(), async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  try {
    const result = await Product.updateOne(
      { _id: id },
      { name: name, price: price, stock: stock, status: status },
      { runValidator: true }
    );
    if (result.ok == 1) {
      res.send({
        status: "success",
        message: "update product success",
        data: result,
      });
    } else {
      res.send({
        status: "warning",
        message: "update product gagal",
        data: result,
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});

//Update routing delete product dengan methode delete
routers.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({
      _id: id,
    });
    if (result.deletedCount == 1) {
      res.send({
        status: "success",
        message: "delete product success",
        data: result,
      });
    } else {
      res.send({
        status: "warining",
        message: "delete product gagal",
        data: result,
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});
module.exports = routers;
