import { dbGetCategories, dbGetUnits } from "../modules/database";

export const getAllUnits = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetUnits(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};

export const getAllCategory = async (req: any, res: any) => {
  const authkey = req.headers.authkey.split(" ");
  req.body.creater = authkey[1];
  await dbGetCategories(authkey[0])
    .then((dbRes) => res.send(dbRes))
    .catch((e) => res.status(502).send({ msg: "Unable To feach Data" }));
};
