import express, { Response, Request } from "express";
const router = express.Router();
import {
  RegisterUser,
  LoginUser,
  getUsers,
  // LogOut,
} from "../controller/userController";

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
// router.get("/logout", LogOut);
router.get("/allusers", getUsers);

export default router;
