import { Request, Response } from "express";
import { MemberRepository } from "../../infrastructure/repositories/MemberRepository";

export class MemberController {
  // 📌 Get all members
  async getAllMembers(req: Request, res: Response) {
    try {
      const members = await MemberRepository.getAll();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Error fetching members" });
    }
  }

  // 📌 Get member by code
  async getMemberByCode(req: Request, res: Response) {
    try {
      const member = await MemberRepository.findByCode(req.params.code);
      if (!member) return res.status(404).json({ message: "Member not found" });
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Error fetching member" });
    }
  }
}
