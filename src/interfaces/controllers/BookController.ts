import { Request, Response } from "express";
import { BookRepository } from "../../infrastructure/repositories/BookRepository";

export class BookController {

  // 📌 Get all books
  static async getAllBooks(req: Request, res: Response) {
    try {
      const books = await BookRepository.getAll();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error fetching books" });
    }
  }

  // 📌 Get book by code
  static async getBookByCode(req: Request, res: Response) {
    try {
      const book = await BookRepository.findByCode(req.params.code);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Error fetching book" });
    }
  }
}
