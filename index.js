import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Item from "./models/itemsModel.js";
import connectDB from "./config/db.js";
import itemRoute from "./routes/items.js";
import bodyParser from "body-parser";
import Razorpay from "razorpay";
import crypto from "crypto"; // Import crypto module
import paymentRoute from "./routes/payment.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import itemsCollection from "./itemsCollection.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/items", itemRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/register", register);
app.use("/api/login", login);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
