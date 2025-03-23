import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  code: string;
  title: string;
  author: string;
  stock: number;
  isAvailable(): boolean; // Define instance method
}

const BookSchema = new Schema<IBook>({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, required: true },
});

// 🔹 Define instance method
BookSchema.methods.isAvailable = function () {
  return this.stock > 0;
};

export default mongoose.model<IBook>("Book", BookSchema);
