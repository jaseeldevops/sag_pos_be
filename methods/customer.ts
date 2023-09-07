import {
  dbGetCustomer,
  dbGetCustomers,
  dbSearchCustomers,
  dbPostCustomer,
  dbUpdateCustomer,
} from "../modules/database";

import { Customer } from "../modules/product";

export const getAllCustomers = async (req: any, res: any) => {
  await dbGetCustomers()
    .then((dbRes: Customer[]) => res.send(dbRes))
    .catch(() => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const getCustomerBySearch = async (req: any, res: any) => {
  await dbSearchCustomers(req.params.search)
    .then((dbRes: any) => res.send(dbRes))
    .catch(() => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const addCustomer = async (req: any, res: any) => {
  var item = new Customer();
  item = { ...item, ...req.body, createdBy: "none", createdAt: new Date() };
  if (item.name === "") {
    res.status(422).send({ msg: "Customer name is misssing" });
    return;
  }
  if (item.phone === "") {
    res.status(422).send({ msg: "Phone number is misssing" });
    return;
  }

  await dbGetCustomer({ phone: item.phone })
    .then(async (dbRes: any) => {
      if (dbRes === null)
        await dbPostCustomer(item)
          .then(() => res.send({ msg: "Succes" }))
          .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
      else res.status(502).send({ msg: "Phone number already exist" });
    })
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
};

export const editCustomer = async (req: any, res: any) => {
  const item = { ...req.body, updatedBy: "none", updatedAt: new Date() };

  if (item.hasOwnProperty("phone")) {
    var pass = false;
    await dbGetCustomer({ phone: item.phone })
      .then(async (dbRes: any) => {
        if (dbRes === null || dbRes._id.toString() === req.body._id)
          pass = true;
        else res.status(502).send({ msg: "Phone Number already exist" });
      })
      .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
    if (!pass) return;
  }

  await dbUpdateCustomer(item)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};

export const deleteCustomer = async (req: any, res: any) => {
  req.params.deletedAt = new Date();
  req.params.deleted = true;
  await dbUpdateCustomer(req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Delete" }));
};
