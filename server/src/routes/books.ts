import express from "express";
import { getAllBooks, getBook, addBook, deleteBook, updateBook } from "../controllers/books";

const router = express.Router();

 // 🚨 NEED TO FIX ROUTE IF GOING TO USE - NOW IT IS SAME AS GETBOOK WITH BOOKID
// get all books for one user
// router.get("/:userid", getAllBooks);

// get a book by id
router.get("/:bookid", getBook);

// add a book
router.post("/", addBook);

// delete a book
router.delete("/:id", deleteBook);

// update a book
router.put("/:id", updateBook);

export default router;