const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

//Configuring Express
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configure MongoDB Database
const connectionString = config.URI;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Database Running Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Database not Available ");
  });

// Routes and Server Setup
const main = require("./routes/main");
app.use("/", main);

//Listen
app.listen(PORT, () => {
  console.log("Server is running...");
});
