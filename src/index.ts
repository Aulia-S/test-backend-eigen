import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { setupSwagger } from './config/swagger';
import bookRoutes from "./interfaces/routes/bookRoutes";
import borrowRoutes from "./interfaces/routes/borrowRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

setupSwagger(app); // Enable Swagger Documentation

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

if (process.env.NODE_ENV !== "test") {
  // Database Connection
  mongoose.connect(process.env.MONGO_URI_DEV as string)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
    console.log(`API docs running on http://localhost:${PORT}/api-docs`);
  });
}

export default app
