import { MemberRepository } from "../../infrastructure/repositories/MemberRepository";
import { BookRepository } from "../../infrastructure/repositories/BookRepository";

export class BorrowBookUseCase {
  async execute(memberCode: string, bookCode: string) {
    const member = await MemberRepository.findByCode(memberCode);
    const book = await BookRepository.findByCode(bookCode);

    if (!member) throw new Error("Member not found");
    if (!book) throw new Error("Book not found");
    if (!book.isAvailable()) throw new Error("Book is not available");
    if (!member.canBorrow()) throw new Error("Member cannot borrow books");

    member.borrowedBooks.push(book.code);
    book.stock -= 1;

    await MemberRepository.update(memberCode, member);
    await BookRepository.update(bookCode, book);

    return { message: "Book borrowed successfully" };
  }
}
