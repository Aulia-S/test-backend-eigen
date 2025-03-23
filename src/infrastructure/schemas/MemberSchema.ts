import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  code: string;
  name: string;
  borrowedBooks: string[];
  penaltyEndDate?: Date;
  hasPenalty(): boolean;
  canBorrow(): boolean;
}

const MemberSchema = new Schema<IMember>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  borrowedBooks: { type: [String], default: [] },
  penaltyEndDate: { type: Date, default: null },
});

// 🔹 Define instance methods
MemberSchema.methods.hasPenalty = function () {
  return this.penaltyEndDate ? new Date() < this.penaltyEndDate : false;
};

MemberSchema.methods.canBorrow = function () {
  return this.borrowedBooks.length < 2 && !this.hasPenalty();
};

export default mongoose.model<IMember>("Member", MemberSchema);
