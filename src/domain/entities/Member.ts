export class Member {
  constructor(
    public code: string,
    public name: string,
    public borrowedBooks: string[] = [],
    public penaltyEndDate?: Date
  ) { }

  hasPenalty(): boolean {
    return this.penaltyEndDate ? new Date() < this.penaltyEndDate : false;
  }

  canBorrow(): boolean {
    return this.borrowedBooks.length < 2 && !this.hasPenalty();
  }
}
