import {
  createNewProduct,
  getAllProducts,
} from "../controllers/products.controllers";

const router = require("express").Router();

router.get("/api/products", getAllProducts);

router.post("/api/products", createNewProduct);

module.exports = router;
