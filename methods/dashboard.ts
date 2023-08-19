import { dbGetCollectionCount } from "../modules/database";

export const getDashBoardData = async (req: any, res: any) => {
  const data = [
    { icon: "", title: "Out of Stock Items", value: "" },
    { icon: "", title: "Stafs", value: "" },
    // { icon: "", title: "Today Purchase", value: "3000rs / 30" },
    // { icon: "", title: "Today Sale", value: "3300rs / 30" },
  ];

  const authkey = req.headers.authkey.split(" ");

  await dbGetCollectionCount(authkey[0], "products", {}).then(
    async (total) =>
      await dbGetCollectionCount(authkey[0], "products", {
        stock: { $lt: 1 },
      }).then((dbRes) => (data[0].value = dbRes + "/" + total))
  );
  await dbGetCollectionCount(authkey[0], "users", {
    type: { $eq: "Admin" },
  }).then(
    async (ad) =>
      await dbGetCollectionCount(authkey[0], "users", {
        type: { $eq: "Staff" },
      }).then((st) => (data[1].value = `Admin - ${ad} / Staffs - ${st}`))
  );

  res.send(data);
};
