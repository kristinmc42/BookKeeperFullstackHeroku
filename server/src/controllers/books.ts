import express, { Request, Response, NextFunction } from "express";
import { userInfo } from "os";
import jwt from "jsonwebtoken";
import { db } from "../db";

interface TokenInterface extends jwt.JwtPayload {
  id: number;
  iat: number;
}

export const getAllBooks = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  get all books for the current user

  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;

    const q = "SELECT * FROM books WHERE userid = ?";

    db.query(q, [user.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};

export const getBook = (req: Request, res: Response) => {
  // gets a specific book in the current user's bookshelf

  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;
    const bookId = req.params.bookid;

    const q =
      "SELECT `title`, `subtitle`, `author`, `genre`,  `img`, `desc`,`pageCount`, `previewLink`, `language`, `publishedDate`, `bookid`, `dateRead`,`status`, `userid` FROM books WHERE bookid = ? AND userid = ?";

    db.query(q, [bookId, user.id], (err, data) => {
      if (err) return res.status(500).json("Book not in database");

      return res.status(200).json(data);
    });
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};

export const addBook = (req: Request, res: Response) => {
  // adds a book to the current user's bookshelf

  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;
    const q =
      "INSERT INTO books(`title`, `subtitle`, `author`, `genre`,  `img`, `desc`,`pageCount`, `previewLink`, `language`, `publishedDate`, `bookid`, `dateRead`,`status`, `userid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.subtitle,
      req.body.author,
      req.body.genre,
      req.body.img,
      req.body.desc,
      req.body.pageCount,
      req.body.previewLink,
      req.body.language,
      req.body.publishedDate,
      req.body.bookid,
      req.body.dateRead,
      req.body.status,
      user.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Book has been added.");
    });
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};

export const deleteBook = (req: Request, res: Response) => {
  // deletes a book from the current user's bookshelf

  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;
    const bookId = req.params.bookid;

    const q = "DELETE FROM books WHERE `bookid` = ? AND `userid` = ?";

    db.query(q, [bookId, user.id], (err: any, data: any) => {
      if (err)
        return res.status(403).json("You can only delete one of your books.");

      return res.json("The book has been deleted!");
    });
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};

export const updateBook = (req: Request, res: Response) => {
  // updates the information on a book in the current user's bookshelf
  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;
    const bookId = req.params.bookid;
    const q =
      "UPDATE books SET `status`=?, `dateRead`=? WHERE `bookid`=? AND `userid`=?";

    const values = [req.body.status, req.body.dateRead];

    db.query(q, [...values, bookId, user.id], (err: any, data: any) => {
      if (err) return res.status(500).json(err);

      return res.json("The book has been updated!");
    });
  } catch (err) {
    if (err) return res.status(403).json("Token is not valid!");
  }
};
