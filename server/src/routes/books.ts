import express from "express";
import { getAllBooks, getBook, addBook, deleteBook, updateBook } from "../controllers/books";

const router = express.Router();

// get all books with matching userid
router.get("/:userid", getAllBooks);

// get a book by bookid and userid
router.get("/:bookid/users/:userid", getBook);

// add a book
router.post("/", addBook);

// delete a book with matching userid
router.delete("/:bookid/users/:userid", deleteBook);


// update a book with matching userid
router.put("/:bookid/users/:userid", updateBook);

export default router;