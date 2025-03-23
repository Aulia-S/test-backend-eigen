import request from "supertest";
import app from "../src/index"; // Ensure this is the correct path

describe("Book API", () => {
  it("should return all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should return a specific book", async () => {
    const res = await request(app).get("/api/books/JK-45"); // Example book code
    expect(res.status).toBe(200);
    expect(res.body.code).toBe("JK-45");
  });

  it("should return 404 for non-existent book", async () => {
    const res = await request(app).get("/api/books/INVALID");
    expect(res.status).toBe(404);
  });

});
