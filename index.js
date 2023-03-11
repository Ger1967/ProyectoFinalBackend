const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const homeServiceRoutes = require("./routes/homeService");

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json(""));
app.use(cookieParser());
app.use(cors());
app.use("/api", homeServiceRoutes);
/* app.use("/uploads/", express.static("imagenes")); */
app.use("/uploads/", express.static("./uploads"));
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
