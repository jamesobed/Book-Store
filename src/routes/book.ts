import express, { NextFunction } from "express";
import { auth } from "../middleware/auth";

const router = express.Router();

import {
  createBooks,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} from "../controller/bookController";

// pages for user ejs
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", auth, createBooks);

router.get("/books", async (req, res, next) => {
  let record = await getBooks(req, res, next);
  res.status(200).json({
    message: "Successfully fetched all books",
    record,
  });
});

router.get("/test", async (req, res, next) => {
  let record = await getBooks(req, res, next);
  res.render("index", { record });
});

router.get("/read/:id", getSingleBook);

router.get("/update/:id", getSingleBook);

router.post("/update/:id", auth, updateBook);

// router.post("/delete", (req, res) => {
//   res.render("dashBoard");
// });
router.delete("/delete/:id", auth, deleteBook);
router.post("/delete/:id", auth, deleteBook);

export default router;
