import { GenerateToken } from "../middlewares/auth";
import bcrypt from "bcryptjs";
import Auth from "../models/authModel";
import { sendEmail } from "../middlewares/sentMail";
class AuthController {
  static async Login(req: any, res: any) {
    try {
      const { email, password:InputPassword } = req.body;
      if (!email || !InputPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const auth = await Auth.findOne({ email });
      if (!auth) {
        return res.status(403).json({ message: "Invalid email or password" });
      }
      const comparePassword = await bcrypt.compare(InputPassword, auth.password);
      if (!comparePassword) {
        return res.status(400).json({ message: "Password does not match" });
      }
      const payload = {
        id: auth._id,
        role: auth.role
      };
      const token = await GenerateToken(payload);
      return res.status(200).json({ GenerateToken:token });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });  
    }
  }
  static async Signup(req: any, res: any) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const existingUser = await Auth.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Auth.create({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      return res
        .status(200)
        .json({ message: "User created successfully", data: user });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" }); 
    }
  }
  static async ForgotPassword(req: any, res: any) {
    try {
      const { email } = req.body;
      const user = await Auth.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = GenerateToken(user._id);
      const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
      sendEmail(email, "Reset Password", link);
      return res
        .status(200)
        .json({ message: "Password reset link sent to your email" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" }); 
    }
  }
}
export default AuthController;
