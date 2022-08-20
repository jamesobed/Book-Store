"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
// pages for user ejs
router.get("/register", (req, res) => {
    res.render("register");
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/forgetpassword", (req, res) => {
    res.render("forgetpassword");
});
// please change the name of the route to
router.get("/create", (req, res) => {
    res.render("create");
});
router.get("/dash", userController_1.renderUserDashBoard);
// get single user
router.get("/author/:id", async (req, res, next) => {
    let record = await (0, userController_1.getUser)(req, res, next);
    res.status(200).json({ message: "successfully fetched a user", record });
});
router.get("/decagon", async (req, res, next) => {
    let record = await (0, userController_1.getUser)(req, res, next);
    res.render("dashBoard", { record });
});
router.get("/logout", userController_1.LogOut);
router.get("/updateauthors/:id", userController_1.updateUser);
router.get("/deleteauthors/:id", userController_1.deleteUser);
router.get("/authors", userController_1.getUsers);
// router.get("/dashboard", renderUserDashBoard);
// router.get("/dashboard", defaultView);
// post
router.post("/register", userController_1.RegisterUser);
router.post("/login", userController_1.LoginUser);
exports.default = router;
