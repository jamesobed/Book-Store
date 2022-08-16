"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
exports.default = router;
