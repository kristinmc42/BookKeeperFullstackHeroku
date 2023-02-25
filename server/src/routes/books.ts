import express from "express";
import { isAuthenticated } from "../middleware/AuthenticateUser";
import { getAllBooks, getBook, addBook, deleteBook, updateBook } from "../controllers/books";


const router = express.Router();

// get all books with matching userid
router.get("/", isAuthenticated, getAllBooks);

// get a book by bookid and userid
router.get("/:bookid", isAuthenticated, getBook);

// add a book
router.post("/", isAuthenticated, addBook);

// delete a book with matching userid
router.delete("/:bookid", isAuthenticated, deleteBook);


// update a book with matching userid
router.put("/:bookid", isAuthenticated, updateBook);

export default router;