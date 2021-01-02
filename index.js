const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;
const hostname = "127.0.0.1";

const cors = require("cors");
const routers = require("./routers");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(routers);
app.listen(port, () => {
  console.log(`Server Runing at http://${hostname}:${port}`);
});

//penerapan mongoose pada aplikasi
