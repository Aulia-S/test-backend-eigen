export class Book {
  constructor(
    public code: string,
    public title: string,
    public author: string,
    public stock: number
  ) { }

  isAvailable(): boolean {
    return this.stock > 0;
  }
}
