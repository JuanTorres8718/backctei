import {
  createNewProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controllers";

const router = require("express").Router();

router.get("/api/products", getAllProducts);

router.post("/api/products", createNewProduct);

router.put("/api/product/:codigo_productos", updateProduct);

module.exports = router;
