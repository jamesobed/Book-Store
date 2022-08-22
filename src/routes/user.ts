import express, { Response, Request, NextFunction } from "express";

const router = express.Router();
import {
  RegisterUser,
  LoginUser,
  getUsers,
  LogOut,
  updateUser,
  deleteUser,
  getUser,
  renderUserDashBoard,
} from "../controller/userController";

// pages for user ejs

router.get("/forgetpassword", (req: Request, res: Response) => {
  res.render("forgetpassword");
});

// please change the name of the route to

// <--------  registration ----------------->

router.get("/table", (req, res) => {
  res.render("dashBoard");
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", RegisterUser);

router.get("/success", (req, res, next) => {
  res.render("successReg");
});

// <--------  log in ----------------->

router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

router.post("/login", LoginUser);

// <--------  log in ----------------->

router.get("/dash", renderUserDashBoard);

// <--------  log out ----------------->

router.get("/logout", LogOut);
router.get("/refresh", (req, res) => {
  res.render("logoutRefresh");
});

//  // <--------  dealing with single user  ----------------->

router.get("/author/:id", async (req, res, next) => {
  let record = await getUser(req, res, next);
  res.status(200).json({ message: "successfully fetched a user", record });
});
router.get("/updateauthors/:id", updateUser);
router.get("/deleteauthors/:id", deleteUser);

//  // <--------  dealing with single user  ----------------->

router.get("/authors", getUsers);

export default router;
