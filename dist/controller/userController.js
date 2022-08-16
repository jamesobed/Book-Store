"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.LogOut = exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const user_1 = require("../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const book_1 = require("../model/book");
async function RegisterUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const duplicatEmail = await user_1.AuthorInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email",
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await user_1.AuthorInstance.create({
            id: id,
            author: req.body.author,
            age: req.body.age,
            email: req.body.email,
            password: passwordHash,
            address: req.body.address,
        });
        res.redirect("/registerAuthor");
        // res.status(201).json({
        //   msg: "You have successfully created a user",
        //   record: record,
        // });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "failed to register",
            route: "/register",
        });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const User = (await user_1.AuthorInstance.findOne({
            where: { email: req.body.email },
        }));
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            res.status(401).json({
                message: "Password do not match",
            });
        }
        // if (validUser) {
        //   res.status(200).json({
        //     message: "Successfully logged in",
        //     token,
        //     User,
        //   });
        // }
        if (validUser) {
            res
                .status(200)
                .cookie("token", token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            })
                .cookie("user", User.id, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });
            res.redirect("/register");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "failed to login",
            route: "/login",
        });
    }
}
exports.LoginUser = LoginUser;
async function LogOut(req, res, next) {
    // res.clearCookie("token");
    // res.status(200).json({ msg: "You have successfully logged out" });
    res.redirect("/login");
}
exports.LogOut = LogOut;
async function getUsers(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await BookInstance.findAll({where: {},limit, offset})
        const record = await user_1.AuthorInstance.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: book_1.BookInstance,
                    as: "Books",
                },
            ],
        });
        res.status(200).render("authors", { record });
        // res.status(200).json({
        //   msg: "You have successfully fetch all books",
        //   count: record.count,
        //   record: record.rows,
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.getUsers = getUsers;
