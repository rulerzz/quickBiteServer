const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

// DB Connection
const DB_URL = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY AT " + "ATLAS");
  })
  .catch(() => {
    console.log("PROBLEM CONNECTING DB");
  });

app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});
// My routes
const userRouter = require("./routes/userRouter");
const customerOrderRouter = require("./routes/customerOrderRouter");
const authRouter = require("./routes/authRouter");

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser());
app.use(express.json());

// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/customer-order", customerOrderRouter);
app.use("/api/v1/", authRouter);
