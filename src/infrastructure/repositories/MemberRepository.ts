import MemberModel, { IMember } from "../schemas/MemberSchema";

export class MemberRepository {
  static async getAll(): Promise<IMember[]> {
    return MemberModel.find();
  }

  static async findByCode(code: string): Promise<IMember | null> {
    return MemberModel.findOne({ code });
  }

  static async save(member: IMember): Promise<IMember> {
    return new MemberModel(member).save();
  }

  static async update(code: string, member: Partial<IMember>): Promise<IMember | null> {
    return MemberModel.findOneAndUpdate({ code }, member, { new: true });
  }
}
