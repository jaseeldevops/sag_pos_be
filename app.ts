const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3200; // Core

import { a1 } from "./routes/a1";
import { connectDataBase } from "./modules/database";

app.use("/a1", a1);
app.get("/", (req: any, res: any) => {
  res.send("hallow");
});
connectDataBase();

app.listen(port, () => {
  console.log(`Express app running on port ${port}!`);
});
