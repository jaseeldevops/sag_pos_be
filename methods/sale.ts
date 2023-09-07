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
  await dbGetSales()
    .then((dbRes) => res.send(dbRes))
    .catch((e) =>
      res.status(502).send({ msg: "Unable To feach Data (ESaA1)" })
    );
};
export const getSale = async (req: any, res: any) => {
  await dbGetSale(req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes?.list?.length; i++)
        await dbGetProduct({}, dbRes?.list[i].product).then(
          (res) => (dbRes.list[i].itemName = res?.itemName || "er(404)")
        );
      res.send(dbRes);
    })
    .catch((e) =>
      res.status(502).send({ msg: "Unable To feach Data (ESaB1)" })
    );
};
export const addSale = async (req: any, res: any) => {
  var item = new Sale();
  item = {
    ...item,
    ...req.body,
    createdBy: "",
    createdAt: new Date(),
  };

  if (item.hasOwnProperty("customer")) {
    if (item.customer.length < 1) {
      res.status(422).send({ msg: "Not a valid Customer (ESaC1)" });
      return;
    }
  } else {
    res.status(422).send({ msg: "Customer ID is required (ESaC2)" });
    return;
  }

  await dbPostSale(item)
    .then(() => {
      res.send({ msg: "Succes" });
      addSaleToStock(item.list);
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Insert (ESaC3)" }));
};

export const editSale = async (req: any, res: any) => {
  const item = { ...req.body, updatedBy: "", updatedAt: new Date() };
  await dbGetSale(req.body._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes.list.length; i++)
        dbRes.list[i].qty = -Number(dbRes.list[i].qty);
      await dbUpdateSale(req.body)
        .then(() => {
          res.send({ msg: "Succes" });
          addSaleToStock(item.list.concat(dbRes.list));
        })
        .catch((e) =>
          res.status(502).send({ msg: "Not Able to Insert (ESaD1)", e })
        );
    })
    .catch((e) =>
      res.status(502).send({ msg: "Not Able to Insert (ESaD2)", e })
    );
};

export const deleteSale = async (req: any, res: any) => {
  req.params.deletedBy = "";
  req.params.deletedAt = new Date();
  req.params.deleted = true;
  dbGetSale(req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes.list.length; i++)
        dbRes.list[i].qty = -Number(dbRes.list[i].qty);
      await dbUpdateSale(req.params)
        .then(() => {
          res.send({ msg: "Succes" });
          addSaleToStock(dbRes.list);
        })
        .catch(() =>
          res.status(502).send({ msg: "Not Able to Delete (ESaE1)" })
        );
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Delete (ESaE2)" }));
};
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
const addSaleToStock = async (list: any) => {
  for (let i = 0; i < list.length; i++) {
    await dbGetProduct({}, list[i].itemId).then(async (dbRes) => {
      const body = {
        _id: list[i].itemId,
        qty: Number(dbRes.qty) - Number(list[i].qty),
      };
      await dbUpdateProduct(body);
    });
  }
};
