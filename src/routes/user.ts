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
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});
router.get("/forgetpassword", (req: Request, res: Response) => {
  res.render("forgetpassword");
});

// please change the name of the route to
router.get("/create", (req: Request, res: Response) => {
  res.render("create");
});

router.get("/dash", renderUserDashBoard);

// get single user
router.get("/author/:id", async (req, res, next) => {
  let record = await getUser(req, res, next);
  res.status(200).json({ message: "successfully fetched a user", record });
});

router.get("/decagon", async (req, res, next) => {
  let record = await getUser(req, res, next);
  res.render("dashBoard", { record });
});

router.get("/logout", LogOut);
router.get("/updateauthors/:id", updateUser);
router.get("/deleteauthors/:id", deleteUser);
router.get("/authors", getUsers);

// router.get("/dashboard", renderUserDashBoard);
// router.get("/dashboard", defaultView);

// post
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

export default router;
