import express from "express";
import product from "../models/product";

const router = express.Router();

router.post("/api/products", async (req, res) => {
  const { name, description, price, quantity } = req.body;

  const errors = [];

  if (!name) errors.push("name is required");
  if (!description) errors.push("description is required");
  if (price === undefined) errors.push("price is required");
  if (quantity === undefined) errors.push("quantity is required");

  if (name && typeof name !== "string") errors.push("name not is string");
  if (description && typeof description !== "string")
    errors.push("description not is string");
  if (price !== undefined && typeof price !== "number")
    errors.push("price not is number");
  if (quantity !== undefined && typeof quantity !== "number")
    errors.push("quantity not is number");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const existingProduct = await product.findOne({ name: name });

    if (existingProduct) {
      return res.status(409).json({
        errors: ["name already registered"],
      });
    }

    const newProduct = new product({
      name,
      description,
      price,
      quantity,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({
      errors: ["an internal server error occurred"],
    });
  }
});

export default router;
