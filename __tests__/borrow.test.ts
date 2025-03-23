import request from "supertest";
import app from "../src/index";

describe("Borrowing API", () => {
  it("should allow a member to borrow a book", async () => {
    const res = await request(app)
      .post("/api/borrow")
      .send({ memberCode: "M003", bookCode: "SHR-1" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Book borrowed successfully");
  });

  it("should not allow borrowing if the book is not available", async () => {
    const res = await request(app)
      .post("/api/borrow")
      .send({ memberCode: "M002", bookCode: "SHR-1" }); // Same book borrowed twice

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Book is not available");
  });

  it("should allow a member to return a book", async () => {
    const res = await request(app)
      .post("/api/borrow/return")
      .send({ memberCode: "M003", bookCode: "SHR-1" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Book returned successfully");
  });

});
