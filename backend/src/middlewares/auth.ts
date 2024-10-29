import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export  const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.MY_SECRET_KEY as string, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded;   
      next();
    });
}

export const GenerateToken = async(user: any) =>{
    try {
        const token = await jwt.sign({ user }, process.env.MY_SECRET_KEY as string, { expiresIn: "1h" });
        return token
    } catch (error) {
        console.log(error)
    }
}
   
  
