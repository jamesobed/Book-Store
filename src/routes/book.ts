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


router.post("/create", auth, createBooks);

router.get('/books', async (req, res, next) => {
  let record = await getBooks(req, res, next)
  res.status(200).json({
    message: "Successfully fetched all books",
    record
    })
})

router.get("/test", async (req, res, next) => {
  let record = await getBooks(req, res, next);
  res.render("index", { record });
});



router.get("/read/:id", getSingleBook);
router.patch("/update/:id", auth, updateBook);
router.delete("/delete/:id", auth, deleteBook);

export default router;
