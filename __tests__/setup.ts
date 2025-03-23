import mongoose from "mongoose";
import app from "../src/index";
import { Server } from "http";

let server: Server;

beforeAll(async () => {
  mongoose.connect(process.env.MONGO_URI_TEST as string)

  server = app.listen(5001);
});

afterAll(async () => {
  await mongoose.connection.close(); // Close MongoDB connection
  server.close();
});
