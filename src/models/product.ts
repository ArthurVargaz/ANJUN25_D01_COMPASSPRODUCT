import mongoose, { Document } from "mongoose";
// @ts-ignore
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

export interface IProduct extends Document {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    id: {
      type: Number,
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

productSchema.plugin(AutoIncrement, { inc_field: "id" });

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
