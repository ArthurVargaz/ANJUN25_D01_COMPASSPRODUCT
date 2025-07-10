import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";

dotenv.config();
const db = mongoose.connection;
const app = express();
const mongo: string = process.env.MONGO_CRUD!;
app.use(express.json());

mongoose
  .connect(mongo)
  .then(() => console.log("Database connected"))
  .catch((error: any): void =>
    console.error("MongoDB connection error: ", error)
  );

app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("SERVER CONNECTED");
});
