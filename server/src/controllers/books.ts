import express, { Request, Response } from "express";
import { userInfo } from "os";
import jwt, { Jwt } from "jsonwebtoken";
import { db } from "../db";

export const getAllBooks = (req: Request, res: Response) => {
  //  get all books for the current user
  const token: string | null = req.cookies.access_token;
  
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_KEY as string, (err, userId) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const q = "SELECT * FROM books WHERE userid = ?";
  

    db.query(q, [Number(userId)], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data);
    });
  })

};

export const getBook = (req: Request, res: Response) => {
  // gets a specific book in the current user's bookshelf
  const token: string | null = req.cookies.access_token;
  
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_KEY as string, (err, userId) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const bookId = req.params.bookid;
    // const userId = Number(req.params.userid);
    const q =
      "SELECT `title`, `subtitle`, `author`, `genre`,  `img`, `desc`,`pageCount`, `previewLink`, `language`, `publishedDate`, `bookid`, `dateRead`,`status`, `userid` FROM books WHERE bookid = ? AND userid = ?";
  
    db.query(q, [bookId, Number(userId)], (err, data) => {
      if (err) return res.status(500).json("Book not in database");
  
      return res.status(200).json(data);
    });
  });
};

export const addBook = (req: Request, res: Response) => {
  // adds a book to the current user's bookshelf

  const token: string | null = req.cookies.access_token;
  
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_KEY as string, (err, userId) => {
    if (err) return res.status(403).json("Token is not valid!");
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
      Number(userId),
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Book has been added.");
    });
  });
};

export const deleteBook = (req: Request, res: Response) => {
  // deletes a book from the current user's bookshelf

  const token: string | null = req.cookies.access_token;
  
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_KEY as string, (err, userId) => {
    if (err) return res.status(403).json("Token is not valid!");

    const bookId = req.params.bookid;
 
    const q = "DELETE FROM books WHERE `bookid` = ? AND `userid` = ?";
  
    db.query(q, [bookId, Number(userId)], (err: any, data: any) => {
      if (err)
        return res.status(403).json("You can only delete one of your books.");
  
      return res.json("The book has been deleted!");
    });
  });
  
};

export const updateBook = (req: Request, res: Response) => {
  // updates the information on a book in the current user's bookshelf
  const token: string | null = req.cookies.access_token;
  
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_KEY as string, (err, userId) => {
    if (err) return res.status(403).json("Token is not valid!");
    const bookId = req.params.bookid;
   
    const q =
      "UPDATE books SET `status`=?, `dateRead`=? WHERE `bookid`=? AND `userid`=?";
  
    const values = [req.body.status, req.body.dateRead];
  
    db.query(q, [...values, bookId, Number(userId)], (err: any, data: any) => {
      if (err) return res.status(500).json(err);
  
      return res.json("The book has been updated!");
    });
  });
  
};
