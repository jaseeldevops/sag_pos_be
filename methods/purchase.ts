import {
  dbGetPurchases,
  dbGetPurchase,
  dbPostPurchase,
  dbUpdatePurchase,
  dbGetProduct,
  dbUpdateProduct,
} from "../modules/database";
import { Purchase } from "../modules/product";

export const getAllPurchases = async (req: any, res: any) => {
  //   const authkey = req.headers.authkey.split(" ");
  await dbGetPurchases()
    .then((dbRes: any) => res.send(dbRes))
    .catch((e: any) => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const getSinglePurchase = async (req: any, res: any) => {
  //   const authkey = req.headers.authkey.split(" ");
  await dbGetPurchase(req.params._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes?.list?.length; i++)
        await dbGetProduct({}, dbRes?.list[i].product).then(
          (res) => (dbRes.list[i].productName = res?.name || "er(404)")
        );
      res.send(dbRes);
    })
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const addPurchase = async (req: any, res: any) => {
  //   const authkey = req.headers.authkey.split(" ");

  if (!req.body.hasOwnProperty("list")) {
    res.status(422).send({ msg: "Item List is missing (EPx1)" });
    return;
  }
  if (!(typeof req.body.list === "object")) {
    res.status(422).send({ msg: "Item List is missing (EPx2)" });
    return;
  }
  if (!(req.body?.list?.length > 0)) {
    res.status(422).send({ msg: "Add atleast one item (EPx3)" });
    return;
  }

  var purchase = new Purchase();
  purchase = {
    ...purchase,
    ...req.body,
    // createdBy: authkey[1],
    createdAt: new Date(),
  };
  await dbPostPurchase(purchase)
    .then(() => {
      res.send({ msg: "Succes" });
      addPurchaseToStock(purchase.list);
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Insert (EPx4)" }));
};

export const editSinglePurchase = async (req: any, res: any) => {
  //   const authkey = req.headers.authkey.split(" ");
  const purchase = {
    ...req.body,
    // updatedBy: authkey[1],
    updatedAt: new Date(),
  };

  if (req.body.hasOwnProperty("list")) {
    if (typeof req.body.list === "object") {
      if (!(req.body?.list?.length > 0)) {
        res.status(422).send({ msg: "Add atleast one item (EPx5)" });
        return;
      }
    } else {
      res.status(422).send({ msg: "Not a valid list (EPx6)" });
      return;
    }
  }

  await dbGetPurchase(req.body?._id)
    .then(async (dbRes) => {
      for (let i = 0; i < dbRes?.list?.length; i++)
        dbRes.list[i].qty = -Number(dbRes.list[i].qty);
      await dbUpdatePurchase(purchase)
        .then(() => {
          res.send({ msg: "Succes" });
          if (purchase.hasOwnProperty("list"))
            addPurchaseToStock(purchase.list.concat(dbRes.list));
        })
        .catch(() =>
          res.status(502).send({ msg: "Not Able to Insert (EPx7)" })
        );
    })
    .catch(() => res.status(502).send({ msg: "Not Able to Insert (EPx8)" }));
};

// export const deleteSinglePurchase = async (req: any, res: any) => {
//   //   const authkey = req.headers.authkey.split(" ");
//   //   req.params.deletedBy = authkey[1];
//   req.params.deletedAt =new  Date();
//   req.params.deleted = true;

//   await dbGetPurchase(req.params?._id)
//     .then(async (dbRes) => {
//       for (let i = 0; i < dbRes.list.length; i++)
//         dbRes.list[i].qty = -Number(dbRes.list[i].qty);
//       await dbUpdatePurchase(req.params)
//         .then(() => {
//           res.send({ msg: "Succes" });
//           addPurchaseToStock(dbRes.list);
//         })
//         .catch(() => res.status(502).send({ msg: "Not Able to Delete" }));
//     })
//     .catch(() => res.status(502).send({ msg: "Not Able to Delete" }));
// };

// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////
const addPurchaseToStock = async (list: any) => {
  for (let i = 0; i < list?.length; i++) {
    await dbGetProduct({}, list[i].itemId).then(async (dbRes) => {
      const body = {
        _id: list[i].itemId,
        qty: Number(dbRes.qty || 0) + Number(list[i].qty || 0),
      };
      await dbUpdateProduct(body);
    });
  }
};
