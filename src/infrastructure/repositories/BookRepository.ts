import BookModel, { IBook } from "../schemas/BookSchema";

export class BookRepository {
  static async getAll(): Promise<IBook[]> {
    return BookModel.find();
  }

  static async findByCode(code: string): Promise<IBook | null> {
    return BookModel.findOne({ code });
  }

  static async save(book: IBook): Promise<IBook> {
    return new BookModel(book).save();
  }

  static async update(code: string, book: Partial<IBook>): Promise<IBook | null> {
    return BookModel.findOneAndUpdate({ code }, book, { new: true });
  }
}
