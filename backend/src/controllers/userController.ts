import User from "../models/userModel";
import { Request, Response } from "express";
class UserController {
  static async getUser(req: any, res: any) {
    const { id } = req.params;
    try {
      const user = await User.findById({ _id: id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  static async createUser(req: any, res: any) {
    try {
      const { authId, email, name, address, city, country } = req.body;
      if (!authId || !email || !name || !address || !city || !country) {
        return res
          .status(400)
          .json({ message: "All fields are required" });
      }

      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
export default UserController;
