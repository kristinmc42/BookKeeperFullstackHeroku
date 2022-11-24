import express from "express";
import { getAllBooks, getBook, addBook, deleteBook, updateBook } from "../controllers/books";

const router = express.Router();

// get all books
router.get("/", getAllBooks);

// get a book by id
router.get("./:id", getBook);

// add a book
router.post("./", addBook);

// delete a book
router.post("./:id", deleteBook);

// update a book
router.put("./:id", updateBook);

export default router;