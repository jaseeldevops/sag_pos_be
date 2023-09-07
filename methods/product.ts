import {
  dbGetProducts,
  dbSearchProducts,
  dbPostProduct,
  dbGetProduct,
  dbUpdateProduct,
} from "../modules/database";

import { Product } from "../modules/product";

export const getAllProducts = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  // req.body.creater = authkey[1];
  await dbGetProducts()
    .then((dbRes: Product[]) => res.send(dbRes))
    .catch(() => res.status(502).send({ msg: "Unable To feach Data (EPrA1)" }));
};

export const getProductsBySearch = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  // req.body.creater = authkey[1];
  await dbSearchProducts(req.params.search)
    .then((dbRes: any) => res.send(dbRes))
    .catch(() => res.status(502).send({ msg: "Unable To feach Data (EPrB1)" }));
};

export const getProductsByBarcode = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  // req.body.creater = authkey[1];
  await dbGetProduct({ barcode: req.params.barcode })
    .then((dbRes: any) => res.send(dbRes))
    .catch(() => res.status(502).send({ msg: "Unable To feach Data (EPrC1)" }));
};

export const addProduct = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  var product = new Product();
  product = {
    ...product,
    ...req.body,
    // createdBy: authkey[1],
    createdAt: new Date(),
  };

  if (product.itemCode === "") {
    res.status(422).send({ msg: "Item Code is misssing (EPrD1)" });
    return;
  }
  if (product.barcode === "") {
    res.status(422).send({ msg: "Barcode is misssing (EPrD2)" });
    return;
  }

  await dbGetProduct({ itemCode: product.itemCode })
    .then(async (dbRes: any) => {
      if (dbRes === null)
        await dbGetProduct({ barcode: product.barcode })
          .then(async (dbRes: any) => {
            if (dbRes === null)
              await dbPostProduct(product)
                .then(() => res.send({ msg: "Succes" }))
                .catch(() =>
                  res.status(502).send({ msg: "Not Able to Insert (EPrD3)" })
                );
            else res.status(502).send({ msg: "Barcode already exist (EPrD4)" });
          })
          .catch((e) => res.status(502).send({ msg: "Not Able to Insert (EPrD5)" }));
      else res.status(502).send({ msg: "Item Code already exist (EPrD6)" });
    })
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert (EPrD7)" }));
};

export const editProduct = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  const product = {
    ...req.body,
    // updatedBy: authkey[1],
    updatedAt: new Date(),
  };

  if (product.hasOwnProperty("itemCode")) {
    var pass = false;
    await dbGetProduct({ itemCode: product.itemCode })
      .then(async (dbRes: any) => {
        if (dbRes === null || dbRes._id.toString() === req.body._id)
          pass = true;
        else res.status(502).send({ msg: "Item ID already exist (EPrE1)" });
      })
      .catch((e) => res.status(502).send({ msg: "Not Able to Insert (EPrE2)" }));
    if (!pass) return;
  }
  if (product.hasOwnProperty("barcode")) {
    var pass = false;
    await dbGetProduct({ barcode: product.barcode })
      .then(async (dbRes: any) => {
        if (dbRes === null || dbRes._id.toString() === req.body._id)
          pass = true;
        else res.status(502).send({ msg: "Barcode already exist (EPrE3)" });
      })
      .catch((e) => res.status(502).send({ msg: "Not Able to Insert (EPrE4)" }));
    if (!pass) return;
  }

  await dbUpdateProduct(product)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert (EPrE5)" }));
};

export const deleteProduct = async (req: any, res: any) => {
  req.params.deletedAt = new Date();
  req.params.deleted = true;
  await dbUpdateProduct(req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Delete (EPrF1)" }));
};
