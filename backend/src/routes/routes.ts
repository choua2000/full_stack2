import express from "express";
import  UserController  from "../controllers/userController";
import  AuthController  from "../controllers/authController";
const router = express.Router();
// MEAN: user
router.get("/users", UserController.getUser);   
router.post("/users", UserController.createUser);       
// MEAN: auth
router.post("/signup", AuthController.Signup);
router.post("/login", AuthController.Login);
router.post("/forgot-password", AuthController.ForgotPassword);
export default router;