"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const bookController_1 = require("../controller/bookController");
// pages for user ejs
router.get("/create", (req, res) => {
    res.render("create");
});
router.post("/create", auth_1.auth, bookController_1.createBooks);
router.get("/books", async (req, res, next) => {
    let record = await (0, bookController_1.getBooks)(req, res, next);
    res.status(200).json({
        message: "Successfully fetched all books",
        record,
    });
});
router.get("/test", async (req, res, next) => {
    let record = await (0, bookController_1.getBooks)(req, res, next);
    res.render("index", { record });
});
router.get("/read/:id", bookController_1.getSingleBook);
router.get("/update/:id", bookController_1.getSingleBook);
router.post("/update/:id", auth_1.auth, bookController_1.updateBook);
// router.post("/delete", (req, res) => {
//   res.render("dashBoard");
// });
router.delete("/delete/:id", auth_1.auth, bookController_1.deleteBook);
router.post("/delete/:id", auth_1.auth, bookController_1.deleteBook);
exports.default = router;
