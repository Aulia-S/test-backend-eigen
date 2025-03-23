import { MemberRepository } from "../../infrastructure/repositories/MemberRepository";
import { BookRepository } from "../../infrastructure/repositories/BookRepository";

export class ReturnBookUseCase {
  async execute(memberCode: string, bookCode: string) {
    const member = await MemberRepository.findByCode(memberCode);
    const book = await BookRepository.findByCode(bookCode);

    if (!member || !book) throw new Error("Member or Book not found");
    if (!member.borrowedBooks.includes(bookCode))
      throw new Error("Member did not borrow this book");

    member.borrowedBooks = member.borrowedBooks.filter((b) => b !== bookCode);
    book.stock += 1;

    const now = new Date();
    if (now.getTime() - (member.penaltyEndDate?.getTime() || 0) > 7 * 24 * 60 * 60 * 1000) {
      member.penaltyEndDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    }

    await MemberRepository.update(memberCode, member);
    await BookRepository.update(bookCode, book);

    return { message: "Book returned successfully" };
  }
}
