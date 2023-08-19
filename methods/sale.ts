import {
  dbGetProduct,
  dbGetSale,
  dbGetSales,
  dbPostSale,
  dbUpdateProduct,
  dbUpdateSale,
} from "../modules/database";
import { Sale } from "../modules/product";

export const getAllSales = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetSales(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};
export const getSingleSale = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetSale(authkey[0], req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes?.list?.length; i++)
        await dbGetProduct(authkey[0], {}, dbRes?.list[i].product).then(
          (res) => (dbRes.list[i].productName = res?.name || "er(404)")
        );
      res.send(dbRes);
    })
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};
export const addSingleSale = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  var sale = new Sale();
  sale = {
    ...sale,
    ...req.body,
    createdBy: authkey[1],
    createdAt: Date(),
  };
  await dbPostSale(authkey[0], sale)
    .then(() => {
      res.send({ msg: "Succes" });
      addSaleToStock(authkey[0], sale.list);
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};
export const editSingleSale = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  var sale = new Sale();
  sale = { ...sale, ...req.body, updatedBy: authkey[1], updatedAt: Date() };
  await dbGetSale(authkey[0], req.body._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes.list.length; i++)
        dbRes.list[i].qty = -Number(dbRes.list[i].qty);
      await dbUpdateSale(authkey[0], req.body)
        .then(() => {
          res.send({ msg: "Succes" });
          addSaleToStock(authkey[0], sale.list.concat(dbRes.list));
        })
        .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};
export const deleteSingleSale = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deletedAt = Date();
  req.params.deleted = true;
  dbGetSale(authkey[0], req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes.list.length; i++)
        dbRes.list[i].qty = -Number(dbRes.list[i].qty);
      await dbUpdateSale(authkey[0], req.params)
        .then(() => {
          res.send({ msg: "Succes" });
          addSaleToStock(authkey[0], dbRes.list);
        })
        .catch(() => res.status(502).send({ msg: "Not Able to Delete" }));
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Delete" }));
};
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
const addSaleToStock = async (authkey: any, list: any) => {
  for (let i = 0; i < list.length; i++) {
    await dbGetProduct(authkey, {}, list[i].product).then(async (dbRes) => {
      const body = {
        _id: list[i].product,
        stock: Number(dbRes.stock) - Number(list[i].qty),
      };
      await dbUpdateProduct(authkey, body);
    });
  }
};
