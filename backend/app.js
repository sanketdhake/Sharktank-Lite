const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const entrepreneur_Router = require("./routes/entrepreneur_router");
const admin_Router = require("./routes/admin_router");
const shark_Router = require("./routes/shark_router");
const business_Router = require("./routes/business_router");
const investments_Router = require("./routes/investments_router");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect(process.env.MONGODB_STRING)
  .then(() => console.log("connected with MongoDB"))
  .catch((e) => console.log(e));

const app = express();
dotenv.config();
const PORT = process.env.PORT;

const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", entrepreneur_Router);
app.use("/", admin_Router);
app.use("/", shark_Router);
app.use("/", business_Router);
app.use("/", investments_Router);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
