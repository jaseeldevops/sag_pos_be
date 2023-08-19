import {
  dbGetStaff,
  dbGetStaffs,
  dbPostStaff,
  dbUpdateStaff,
} from "../modules/database";
import { User } from "../modules/product";

export const getAllUsers = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetStaffs(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};
export const addSingleUser = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  var user = new User();
  user = { ...user, ...req.body, createdBy: authkey[1], createdAt: Date() };
  await dbGetStaff(authkey[0], { user: user.user })
    .then(async (dbRes) => {
      if (dbRes === null)
        await dbPostStaff(authkey[0], user)
          .then(() => res.send({ msg: "Succes" }))
          .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
      else res.status(502).send({ msg: "Name already exist" });
    })
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
};
export const editSingleUser = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  var user = new User();
  user = { ...user, ...req.body, updatesBy: authkey[1], updatesAt: Date() };
  await dbGetStaff(authkey[0], { user: user.user })
    .then(async (dbRes) => {
      if (dbRes === null || dbRes._id.toString() === req.body._id)
        await dbUpdateStaff(authkey[0], user)
          .then(() => res.send({ msg: "Succes" }))
          .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
      else res.status(502).send({ msg: "Name already exist" });
    })
    .catch((e) => res.status(502).send({ msg: "Not Able to Insert" }));
};
export const deleteSingleUser = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.params.deletedBy = authkey[1];
  req.params.deletedAt = Date();
  req.params.deleted = true;
  await dbUpdateStaff(authkey[0], req.params)
    .then(() => res.send({ msg: "Succes" }))
    .catch(() => res.status(502).send({ msg: "Not Able to Insert" }));
};
