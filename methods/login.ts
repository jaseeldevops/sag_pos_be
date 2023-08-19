import { dbGetUser } from "../modules/database";

export const userLogin = async (req: any, res: any) => {
  const user = await dbGetUser(req.body);
  if (user === null) res.status(401).send({ msg: "Wrong User Details" });
  else
    res.send({
      user: user.user,
      org: req.body.org,
      id: user._id,
      name: user.name,
    });
};
