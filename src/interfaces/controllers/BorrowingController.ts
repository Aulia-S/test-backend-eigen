import { Request, Response } from "express";
import { BookRepository } from "../../infrastructure/repositories/BookRepository";
import { MemberRepository } from "../../infrastructure/repositories/MemberRepository";

export class BorrowingController {
  // 📌 Borrow a book
  static async borrowBook(req: Request, res: Response) {
    const { memberCode, bookCode } = req.body;

    try {
      const member = await MemberRepository.findByCode(memberCode);
      const book = await BookRepository.findByCode(bookCode);

      if (!member || !book) return res.status(404).json({ message: "Member or Book not found" });

      if (!member.canBorrow()) return res.status(400).json({ message: "Member cannot borrow books" });
      if (!book.isAvailable()) return res.status(400).json({ message: "Book is not available" });

      // Borrow book
      member.borrowedBooks.push(book.code);
      book.stock -= 1;

      await MemberRepository.update(memberCode, member);
      await BookRepository.update(bookCode, book);

      res.json({ message: "Book borrowed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error borrowing book" });
    }
  }

  // 📌 Return a book
  static async returnBook(req: Request, res: Response) {
    const { memberCode, bookCode } = req.body;

    try {
      const member = await MemberRepository.findByCode(memberCode);
      const book = await BookRepository.findByCode(bookCode);

      if (!member || !book) return res.status(404).json({ message: "Member or Book not found" });

      if (!member.borrowedBooks.includes(bookCode)) {
        return res.status(400).json({ message: "Member did not borrow this book" });
      }

      // Remove book from borrowed list
      member.borrowedBooks = member.borrowedBooks.filter((b) => b !== bookCode);
      book.stock += 1;

      // Handle penalties
      const borrowedDays = (new Date().getTime() - new Date(member.penaltyEndDate || new Date()).getTime()) / (1000 * 60 * 60 * 24);
      if (borrowedDays > 7) {
        member.penaltyEndDate = new Date();
        member.penaltyEndDate.setDate(member.penaltyEndDate.getDate() + 3);
      }

      await MemberRepository.update(memberCode, member);
      await BookRepository.update(bookCode, book);

      res.json({ message: "Book returned successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error returning book" });
    }
  }
}
