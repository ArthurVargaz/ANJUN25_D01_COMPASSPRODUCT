"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, quantity } = req.body;
    const errors = [];
    if (!name)
        errors.push("name is required");
    if (!description)
        errors.push("description is required");
    if (price === undefined)
        errors.push("price is required");
    if (quantity === undefined)
        errors.push("quantity is required");
    if (name && typeof name !== "string")
        errors.push("name not is string");
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
        const existingProduct = yield product_1.default.findOne({ name: name });
        if (existingProduct) {
            return res.status(409).json({
                errors: ["name already registered"],
            });
        }
        const newProduct = new product_1.default({
            name,
            description,
            price,
            quantity,
        });
        const savedProduct = yield newProduct.save();
        return res.status(201).json(savedProduct);
    }
    catch (error) {
        return res.status(500).json({
            errors: ["an internal server error occurred"],
        });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const total = yield product_1.default.countDocuments();
        const products = yield product_1.default.find().skip(skip).limit(limit);
        res.status(200).json({
            page,
            total,
            count: products.length,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({ errors: ["an internal server error occurred"] });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findById(id);
        if (!product) {
            return res.status(404).json({
                errors: ["product not found"],
            });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        return res.status(500).json({
            errors: ["an internal server error occurred"],
        });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    const errors = [];
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
        const existingProduct = yield product_1.default.findById(id);
        if (!existingProduct) {
            return res.status(404).json({
                errors: ["product not found"],
            });
        }
        if (name) {
            const nameExists = yield product_1.default.findOne({
                name,
                _id: { $ne: id },
            });
            if (nameExists) {
                return res.status(409).json({
                    errors: ["name already registered"],
                });
            }
        }
        if (name !== undefined)
            existingProduct.name = name;
        if (description !== undefined)
            existingProduct.description = description;
        if (price !== undefined)
            existingProduct.price = price;
        if (quantity !== undefined)
            existingProduct.quantity = quantity;
        yield existingProduct.save();
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({
            errors: ["an internal server error occurred"],
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedProduct = yield product_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ errors: "product not found" });
        }
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({
            errors: ["an internal server error occurred"],
        });
    }
});
exports.deleteProduct = deleteProduct;
