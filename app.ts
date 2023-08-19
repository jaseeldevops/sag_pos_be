const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3100; // Core

import { a1 } from "./routes/a1";
import { connectDataBase } from "./modules/database";

app.use("/a1", a1);
connectDataBase();

app.listen(port, () => {
  console.log(`Express app running on port ${port}!`);
});
