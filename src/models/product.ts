import mongoose from "mongoose";
// @ts-ignore
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

productSchema.plugin(AutoIncrement, { inc_field: "id" });

export default mongoose.model("Product", productSchema);
