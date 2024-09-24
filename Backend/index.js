require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");
const cors = require("cors");
const port = process.env.PORT;
const userRoute = require("./routes/user.routes.js");
const journeyRoute = require("./routes/journey.routes.js");

const {
  checkForAuthenticationCookie,
  restrictTo,
} = require("./middlewares/user.middlewares.js");

const dataBaseUrl = process.env.DATABASE_URL;
connectToMongoDB(dataBaseUrl);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  return res.send("Hello!, Welcome to Share Ride.");
});

app.use("/user", userRoute);
app.use("/journey", restrictTo(["USER", "ADMIN"]), journeyRoute);

app.listen(port, () => console.log(`Server is running on PORT: ${port}`));
