require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser= require("cookie-parser")

const { connectToMongoDB } = require("./connect");

const { restrictUsertoLogedIn, checkAuth } = require("./middleware/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8080;

connectToMongoDB(process.env.MONGODB_URL).then(() =>
  console.log("Mongodb connected")
);

//tells that we are using a engine to express
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//tells express how to parse json data
app.use(express.json());
//tells express how to parse html data coming from form
app.use(express.urlencoded({ extended: false }));
//for parsing the cookie
app.use(cookieParser());

app.use("/url", restrictUsertoLogedIn, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);




app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}  http://localhost:${PORT}/`));
