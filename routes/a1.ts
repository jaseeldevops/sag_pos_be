const express = require("express");
import {
  getAllPurchases,
  getSinglePurchase,
  addPurchase,
  //   editSinglePurchase,
  //   deleteSinglePurchase,
} from "../methods/purchase";
import {
  addSingleProduct,
  deleteSingleProduct,
  editSingleProduct,
  getAllProducts,
  getProductsByBarcode,
  getProductsBySearch,
} from "../methods/product";
import {
  getAllSales,
  getSingleSale,
  addSingleSale,
  editSingleSale,
  deleteSingleSale,
} from "../methods/sale";
import {
  getAllUsers,
  addSingleUser,
  editSingleUser,
  deleteSingleUser,
} from "../methods/user";
import { getDashBoardData } from "../methods/dashboard";
import { userLogin } from "../methods/login";
import { getAllCategory, getAllUnits } from "../methods/settings";

export const a1: any = express.Router();
// a1.post("/login", userLogin);
// ////////////////////////////////////////////////////////////////
// a1.get("/dashboard", getDashBoardData);
// ////////////////////////////////////////////////////////////////
a1.get("/products", getAllProducts);
a1.get("/productsbybarcode/:barcode", getProductsByBarcode);
a1.get("/products/:search", getProductsBySearch);
a1.post("/product", addSingleProduct);
a1.put("/product", editSingleProduct);
a1.delete("/product/:_id", deleteSingleProduct);
// ////////////////////////////////////////////////////////////////
a1.get("/purchases", getAllPurchases);
a1.get("/purchase/:_id", getSinglePurchase);
a1.post("/purchase", addPurchase);
// a1.put("/purchase", editSinglePurchase);
// a1.delete("/purchase/:_id", deleteSinglePurchase);
// ////////////////////////////////////////////////////////////////
// a1.get("/sales", getAllSales);
// a1.get("/sale/:_id", getSingleSale);
// a1.post("/sale", addSingleSale);
// a1.put("/sale", editSingleSale);
// a1.delete("/sale/:_id", deleteSingleSale);
// // ////////////////////////////////////////////////////////////////
// a1.get("/staffs", getAllUsers);
// a1.post("/staff", addSingleUser);
// a1.put("/staff", editSingleUser);
// a1.delete("/staff/:_id", deleteSingleUser);
// // ////////////////////////////////////////////////////////////////
// a1.get("/units", getAllUnits);
// a1.get("/categories", getAllCategory);
