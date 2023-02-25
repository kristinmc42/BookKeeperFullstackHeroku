import express, { Request, Response, NextFunction } from "express";
import {
  getAllUsersBooks,
  getSingleBook,
  addBookToDB,
  deleteDbBook,
  updateDbBook,
} from "../db";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  get all books for the current user
  try {
    const userId: number = Number(req.params.userId);

    const allBooks = await getAllUsersBooks(userId).catch((err) => {
      return res.status(500).json("User not found");
    });

    return res.status(200).json(allBooks);
  } catch (err: any) {
    console.error(err.stack);
    return res.status(500).json(err);
  }
};

export const getBook = async (req: Request, res: Response) => {
  // gets a specific book in the current user's bookshelf
  try {
    const userId: number = Number(req.params.userId);

    const bookInfo = await getSingleBook(req.params.bookid, userId).catch(
      (err) => {
        console.error(err.stack);
        return res.status(500).json("Book not in database");
      }
    );
    return res.status(200).json(bookInfo);
  } catch (err: any) {
    console.error(err.stack);
    return res.status(500).json(err);
  }
};

export const addBook = async (req: Request, res: Response) => {
  // adds a book to the current user's bookshelf
  try {
    const userId: number = Number(req.params.userId);

    const success = await addBookToDB(req.body, userId).catch((err) => {
      console.error(err.stack);
      return res.status(500).json("Book not in database");
    });
    return res.status(200).json("Book has been added.");
  } catch (err: any) {
    console.error(err.stack);
    return res.status(500).json(err);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  // deletes a book from the current user's bookshelf
  try {
    const userId: number = Number(req.params.userId);

    const success = await deleteDbBook(req.params.bookid, userId).catch(
      (err) => {
        console.error(err.stack);
        return res.status(403).json("You can only delete one of your books.");
      }
    );

    return res.json("The book has been deleted!");
  } catch (err: any) {
    console.error(err.stack);
    return res.status(500).json(err);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  // updates the information on a book in the current user's bookshelf
  try {
    const userId: number = Number(req.params.userId);

    const success = await updateDbBook(
      req.params.bookid,
      userId,
      req.body.status,
      req.body.dateRead
    ).catch((err) => {
      console.error(err.stack);
      return res.status(500).json(err);
    });
    return res.json("The book has been updated!");
  } catch (err: any) {
    console.error(err.stack);
    return res.status(500).json(err);
  }
};
