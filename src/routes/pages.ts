import express from "express";
const router = express.Router();
// import {
//   RegisterUser,
//   LoginUser,
//   getUsers,
// } from "../controller/userController";

router.post("/login", (req, res) => {
  res.render("login");
});
router.post("/register", (req, res) => {
  res.render("register");
});

export default router;
