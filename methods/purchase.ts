// import {
//   dbGetPurchases,
//   dbGetPurchase,
//   dbPostPurchase,
//   dbUpdatePurchase,
//   dbGetProduct,
//   dbUpdateProduct,
// } from "../modules/database";
// import { Purchase } from "../modules/product";

// export const getAllPurchases = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   await dbGetPurchases(authkey[0])
//     .then((dbRes) => res.send(dbRes))
//     .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
// };

// export const getSinglePurchase = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   await dbGetPurchase(authkey[0], req.params._id)
//     .then(async (dbRes) => {
//       for (let i = 0; i < dbRes?.list?.length; i++)
//         await dbGetProduct(authkey[0], {}, dbRes?.list[i].product).then(
//           (res) => (dbRes.list[i].productName = res?.name || "er(404)")
//         );
//       res.send(dbRes);
//     })
//     .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
// };

// export const addSinglePurchase = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   var purchase = new Purchase();
//   purchase = {
//     ...purchase,
//     ...req.body,
//     createdBy: authkey[1],
//     createdAt: Date(),
//   };
//   await dbPostPurchase(authkey[0], purchase)
//     .then(() => {
//       res.send({ msg: "Succes" });
//       addPurchaseToStock(authkey[0], purchase.list);
//     })
//     .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
// };

// export const editSinglePurchase = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   var purchase = new Purchase();
//   purchase = {
//     ...purchase,
//     ...req.body,
//     updatedBy: authkey[1],
//     updatedAt: Date(),
//   };
//   await dbGetPurchase(authkey[0], req.body?._id)
//     .then(async (dbRes) => {
//       for (let i = 0; i < dbRes.list.length; i++)
//         dbRes.list[i].qty = -Number(dbRes.list[i].qty);
//       await dbUpdatePurchase(authkey[0], purchase)
//         .then(() => {
//           res.send({ msg: "Succes" });
//           addPurchaseToStock(authkey[0], purchase.list.concat(dbRes.list));
//         })
//         .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
//     })
//     .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
// };

// export const deleteSinglePurchase = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   req.params.deletedBy = authkey[1];
//   req.params.deletedAt = Date();
//   req.params.deleted = true;

//   await dbGetPurchase(authkey[0], req.params?._id)
//     .then(async (dbRes) => {
//       for (let i = 0; i < dbRes.list.length; i++)
//         dbRes.list[i].qty = -Number(dbRes.list[i].qty);
//       await dbUpdatePurchase(authkey[0], req.params)
//         .then(() => {
//           res.send({ msg: "Succes" });
//           addPurchaseToStock(authkey[0], dbRes.list);
//         })
//         .catch(() => res.status(502).send({ msg: "Not Able to Delete" }));
//     })
//     .catch(() => res.status(502).send({ msg: "Not Able to Delete" }));
// };

// // //////////////////////////////////////////////////////////////////////
// // //////////////////////////////////////////////////////////////////////
// // //////////////////////////////////////////////////////////////////////
// // //////////////////////////////////////////////////////////////////////
// const addPurchaseToStock = async (authkey: any, list: any) => {  
//   for (let i = 0; i < list.length; i++) {
//     await dbGetProduct(authkey, {}, list[i].product).then(async (dbRes) => {
//       const body = {
//         _id: list[i].product,
//         stock: Number(dbRes.stock) + Number(list[i].qty),
//       };
//       await dbUpdateProduct(authkey, body);
//     });
//   }
// };
