import express from "express";
import Product from "../models/product";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, description, price, quantity } = req.body;

  const errors: string[] = [];

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
    const existingProduct = await Product.findOne({ name: name });

    if (existingProduct) {
      return res.status(409).json({
        errors: ["name already registered"],
      });
    }

    const newProduct = new Product({
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        errors: ["product not found"],
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      errors: ["an internal server error occurred"],
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ errors: ["an internal server error occurred"] });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  const errors: string[] = [];

  if (name !== undefined && typeof name !== "string") {
    errors.push("name not is string");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("description not is string");
  }

  if (price !== undefined && typeof price !== "number") {
    errors.push("price not is number");
  }

  if (quantity !== undefined && typeof quantity !== "number") {
    errors.push("quantity not is number");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        errors: ["product not found"],
      });
    }

    if (name) {
      const nameExists = await Product.findOne({
        name,
        _id: { $ne: id },
      });

      if (nameExists) {
        return res.status(409).json({
          errors: ["name already registered"],
        });
      }
    }

    if (name !== undefined) existingProduct.name = name;
    if (description !== undefined) existingProduct.description = description;
    if (price !== undefined) existingProduct.price = price;
    if (quantity !== undefined) existingProduct.quantity = quantity;

    await existingProduct.save();

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      errors: ["an internal server error occurred"],
    });
  }
});

export default router;
