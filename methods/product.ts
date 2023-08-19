import {
  dbGetProducts,
  dbSearchProducts,
  dbPostProduct,
  dbGetProduct,
  dbUpdateProduct,
} from "../modules/database";

import { Product } from "../modules/product";

// export const getAllProducts = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   req.body.creater = authkey[1];
//   await dbGetProducts(authkey[0])
//     .then((dbRes: Product[]) => res.send(dbRes))
//     .catch(() => res.status(502).send({ msg: "Unable To feach Data" }));
// };

// export const getProductsBySearch = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   req.body.creater = authkey[1];
//   await dbSearchProducts(authkey[0], req.params.search)
//     .then((dbRes: any) => res.send(dbRes))
//     .catch(() => res.status(502).send({ msg: "Unable To feach Data" }));
// };

export const addSingleProduct = async (req: any, res: any) => {
  // const authkey = req.headers.authkey.split(" ");
  var product = new Product();
  product = {
    ...product,
    ...req.body,
    // createdBy: authkey[1],
    createdAt: Date(),
  };
  await dbGetProduct({ itemCode: product.itemCode })
    .then(async (dbRes: any) => {
      if (dbRes === null)
        await dbGetProduct({ itemId: product.itemId })
          .then(async (dbRes: any) => {
            if (dbRes === null)
              await dbPostProduct(product)
                .then(() => res.send({ msg: "Succes" }))
                .catch(() =>
                  res.status(502).send({ msg: "Not Able to Insert" })
                );
            else res.status(502).send({ msg: "Item ID already exist" });
          })
          .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
      else res.status(502).send({ msg: "Item Code already exist" });
    })
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
};

// export const editSingleProduct = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   var product = new Product();
//   product = {
//     ...product,
//     ...req.body,
//     updatedBy: authkey[1],
//     updatedAt: Date(),
//   };
//   await dbGetProduct(authkey[0], { name: product.name })
//     .then(async (dbRes: any) => {
//       if (dbRes === null || dbRes._id.toString() === req.body._id)
//         await dbUpdateProduct(authkey[0], product)
//           .then(() => res.send({ msg: "Succes" }))
//           .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
//       else res.status(502).send({ msg: "Name already exist" });
//     })
//     .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
// };

// export const deleteSingleProduct = async (req: any, res: any) => {
//   const authkey = req.headers.authkey.split(" ");
//   req.params.deletedBy = authkey[1];
//   req.params.deletedAt = Date();
//   req.params.deleted = true;
//   await dbUpdateProduct(authkey[0], req.params)
//     .then(() => res.send({ msg: "Succes" }))
//     .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
// };
