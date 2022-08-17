import express from "express";
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
router.get("/", getBooks);
router.get("/read/:id", getSingleBook);
router.patch("/update/:id", auth, updateBook);
router.delete("/delete/:id", auth, deleteBook);

export default router;
