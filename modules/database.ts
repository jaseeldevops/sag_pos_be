import { Customer, Product } from "./product";

const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://pos90160:pos90160@cluster0.ilxscy5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const database = client.db("myPos");

export const connectDataBase = async () => {
  await client.connect();
  console.log("Atles Connected");
};

// ///////////////////////////////////////////////////////
export const dbGetUser = async (data: any) => {
  const database = client.db(data.org);
  const collection = database.collection("users");
  return collection.findOne({ user: data.user, password: data.password });
};
// ///////////////////////////////////////////////////////
export const dbGetCollectionCount = async (org: any, item: any, query: any) => {
  const database = client.db(org);
  const collection = database.collection(item);
  return collection.count({ deleted: { $ne: true }, ...query });
};
// ///////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////
export const dbGetProducts = async () => {
  const collection = database.collection("products");
  return collection
    .find({ deleted: { $ne: true } })
    .sort({ $natural: -1 })
    .toArray();
};
export const dbSearchProducts = async (search: any) => {
  const collection = database.collection("products");
  let regex = new RegExp(search, "i");
  return collection
    .find({ deleted: { $ne: true }, itemName: { $regex: regex } })
    .toArray();
};
export const dbGetProduct = async (data: any, _id?: any) => {
  const collection = database.collection("products");
  if (_id) return collection.findOne({ _id: new ObjectId(_id) });
  return collection.findOne(data);
};
export const dbPostProduct = async (data: Product) => {
  const collection = database.collection("products");
  return collection.insertOne(data);
};
export const dbUpdateProduct = async (data: any) => {
  const collection = database.collection("products");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////
export const dbGetPurchases = async (query?: any) => {
  const collection = database.collection("purchase");
  return collection
    .find({ deleted: { $ne: true } }, query)
    .sort({ $natural: -1 })
    .toArray();
};
export const dbGetPurchase = async (_id: any) => {
  const collection = database.collection("purchase");
  return collection.findOne({ _id: new ObjectId(_id) });
};
export const dbPostPurchase = async (data: any) => {
  const collection = database.collection("purchase");
  return collection.insertOne(data);
};
export const dbUpdatePurchase = async (data: any) => {
  const collection = database.collection("purchase");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////
export const dbGetCustomers = async () => {
  const collection = database.collection("customers");
  return collection
    .find({ deleted: { $ne: true } })
    .sort({ $natural: -1 })
    .toArray();
};
export const dbSearchCustomers = async (search: any) => {
  const collection = database.collection("customers");
  let regex = new RegExp(search, "i");
  return collection
    .find({ deleted: { $ne: true }, name: { $regex: regex } })
    .toArray();
};
export const dbGetCustomer = async (data: any, _id?: any) => {
  const collection = database.collection("customers");
  if (_id) return collection.findOne({ _id: new ObjectId(_id) });
  return collection.findOne(data);
};
export const dbPostCustomer = async (data: Customer) => {
  const collection = database.collection("customers");
  return collection.insertOne(data);
};
export const dbUpdateCustomer = async (data: any) => {
  const collection = database.collection("customers");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////
export const dbGetSales = async (query?: any) => {
  const collection = database.collection("sales");
  return collection
    .find({ deleted: { $ne: true } }, query)
    .sort({ $natural: -1 })
    .toArray();
};
export const dbGetSale = async (_id: any) => {
  const collection = database.collection("sales");
  return collection.findOne({ _id: new ObjectId(_id) });
};
export const dbPostSale = async (data: any) => {
  const collection = database.collection("sales");
  return collection.insertOne(data);
};
export const dbUpdateSale = async (data: any) => {
  const collection = database.collection("sales");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
export const dbGetStaffs = async (org: any) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
export const dbGetStaff = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.findOne(data);
};
export const dbPostStaff = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("users");
  return collection.insertOne(data);
};
export const dbUpdateStaff = async (org: any, data: any) => {
  const database = client.db(org);
  const collection = database.collection("users");
  const _id = new ObjectId(data._id);
  delete data._id;
  return collection.updateOne({ _id }, { $set: data });
};
// ///////////////////////////////////////////////////////
export const dbGetUnits = async (org: any) => {
  const database = client.db(org);
  const collection = database.collection("units");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
export const dbGetCategories = async (org: any) => {
  const database = client.db(org);
  const collection = database.collection("categories");
  return collection.find({ deleted: { $ne: true } }).toArray();
};
