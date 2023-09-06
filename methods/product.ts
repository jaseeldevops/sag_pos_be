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
    .catch(() => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const getProductsBySearch = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  // req.body.creater = authkey[1];
  await dbSearchProducts(req.params.search)
    .then((dbRes: any) => res.send(dbRes))
    .catch(() => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const getProductsByBarcode = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  // req.body.creater = authkey[1];
  await dbGetProduct({ barcode: req.params.barcode })
    .then((dbRes: any) => res.send(dbRes))
    .catch(() => res.status(502).send({ msg: "Unable To feach Data" }));
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
    res.status(422).send({ msg: "Item Code is misssing" });
    return;
  }
  if (product.barcode === "") {
    res.status(422).send({ msg: "Barcode is misssing" });
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
                  res.status(502).send({ msg: "Not Able to Insert" })
                );
            else res.status(502).send({ msg: "Barcode already exist" });
          })
          .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
      else res.status(502).send({ msg: "Item Code already exist" });
    })
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
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
        else res.status(502).send({ msg: "Item ID already exist" });
      })
      .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
    if (!pass) return;
  }
  if (product.hasOwnProperty("barcode")) {
    var pass = false;
    await dbGetProduct({ barcode: product.barcode })
      .then(async (dbRes: any) => {
        if (dbRes === null || dbRes._id.toString() === req.body._id)
          pass = true;
        else res.status(502).send({ msg: "Barcode already exist" });
      })
      .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
    if (!pass) return;
  }

  await dbUpdateProduct(product)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};

export const deleteProduct = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  // req.params.deletedBy = authkey[1];
  req.params.deletedAt = Date();
  req.params.deleted = true;
  await dbUpdateProduct(req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Delete" }));
};
