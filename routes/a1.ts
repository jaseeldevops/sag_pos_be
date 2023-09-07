const express = require("express");
import {
  getAllPurchases,
  getSinglePurchase,
  addPurchase,
  editPurchase,
  deletePurchase,
} from "../methods/purchase";
import {
  addProduct,
  deleteProduct,
  editProduct,
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
import { addCustomer, deleteCustomer, editCustomer, getAllCustomers, getCustomerBySearch } from "../methods/customer";

export const a1: any = express.Router();
// a1.post("/login", userLogin);
// ////////////////////////////////////////////////////////////////
// a1.get("/dashboard", getDashBoardData);
// ////////////////////////////////////////////////////////////////
a1.get("/products", getAllProducts);
a1.get("/productsbybarcode/:barcode", getProductsByBarcode);
a1.get("/products/:search", getProductsBySearch);
a1.post("/product", addProduct);
a1.put("/product", editProduct);
a1.delete("/product/:_id", deleteProduct);
// ////////////////////////////////////////////////////////////////
a1.get("/customers", getAllCustomers);
a1.get("/customers/:search", getCustomerBySearch);
a1.post("/customer", addCustomer);
a1.put("/customer", editCustomer);
a1.delete("/customer/:_id", deleteCustomer);
// ////////////////////////////////////////////////////////////////
a1.get("/purchases", getAllPurchases);
a1.get("/purchase/:_id", getSinglePurchase);
a1.post("/purchase", addPurchase);
a1.put("/purchase", editPurchase);
a1.delete("/purchase/:_id", deletePurchase);
// ////////////////////////////////////////////////////////////////
a1.get("/sales", getAllSales);
a1.get("/sale/:_id", getSingleSale);
a1.post("/sale", addSingleSale);
a1.put("/sale", editSingleSale);
a1.delete("/sale/:_id", deleteSingleSale);
// // ////////////////////////////////////////////////////////////////
// a1.get("/staffs", getAllUsers);
// a1.post("/staff", addSingleUser);
// a1.put("/staff", editSingleUser);
// a1.delete("/staff/:_id", deleteSingleUser);
// // ////////////////////////////////////////////////////////////////
// a1.get("/units", getAllUnits);
// a1.get("/categories", getAllCategory);
