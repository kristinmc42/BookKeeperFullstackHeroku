import express, { Request, Response, NextFunction } from "express";
import { userInfo } from "os";
import jwt from "jsonwebtoken";
import {
  getAllUsersBooks,
  getSingleBook,
  addBookToDB,
  deleteDbBook,
  updateDbBook,
} from "../db";

interface TokenInterface extends jwt.JwtPayload {
  id: number;
  iat: number;
}

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  get all books for the current user
  // check authenticated
  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;

    const allBooks = await getAllUsersBooks(user.id).catch((err) => {
      console.error(err.stack);
      return res.status(500).json("User not found");
    });

    return res.status(200).json(allBooks);
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};

export const getBook = async (req: Request, res: Response) => {
  // gets a specific book in the current user's bookshelf

  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;

    const bookInfo = await getSingleBook(req.params.bookid, user.id).catch(
      (err) => {
        console.error(err.stack);
        return res.status(500).json("Book not in database");
      }
    );

    return res.status(200).json(bookInfo);
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};

export const addBook = async (req: Request, res: Response) => {
  // adds a book to the current user's bookshelf

  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;

    const success = await addBookToDB(req.body, user.id).catch((err) => {
      console.error(err.stack);
      return res.status(500).json("Book not in database");
    });
    return res.status(200).json("Book has been added.");
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  // deletes a book from the current user's bookshelf
  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;

    const success = await deleteDbBook(req.params.bookid, user.id).catch(
      (err) => {
        console.error(err.stack);
        return res.status(403).json("You can only delete one of your books.");
      }
    );

    return res.json("The book has been deleted!");
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};

export const updateBook = async (req: Request, res: Response) => {
  // updates the information on a book in the current user's bookshelf
  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;

    const success = await updateDbBook(
      req.params.bookid,
      user.id,
      req.body.status,
      req.body.dateRead
    ).catch((err) => {
      console.error(err.stack);
      return res.status(500).json(err);
    });
    return res.json("The book has been updated!");
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};
