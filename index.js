const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const postgres = require("postgres");
// const myconn = require("express-myconnection");

const homeServiceRoutes = require("./routes/homeService");

require("dotenv").config();

const app = express();

// app.use(
//   myconn(postgres, {
//     host: "localhost",
//     port: 5432,
//     user: "postgres",
//     password: "postgres",
//     database: "homeService",
//   })
// );
app.use(morgan("dev"));
app.use(bodyParser.json(""));
app.use(cookieParser());
app.use(cors());
app.use("/api", homeServiceRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
