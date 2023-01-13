import express, { Request, Response } from "express";
import { userInfo } from "os";
import { db } from "../db";
import jwt from "jsonwebtoken";

export const getAllBooks = (req: Request, res: Response) => {
    //  get all books for the user
    // user must be signed in to access books
    // const token:string | null = req.cookies.access_token;

    // if (!token) return res.status(401).json("Not authenticated!");

    // jwt.verify(token, process.env.JWT_KEY as string, (err: any, userInfo: any) => {
    //     if (err) return res.status(403).json("Token is not valid!");
        // [req.params.userId]
        // const q = req.query.status
        //     ? "SELECT * FROM books WHERE status=?"
        //     : "SELECT * FROM books";
   
        const q = "SELECT * FROM books WHERE userid = ?"
        
        db.query(q, [Number(req.params.userid)], (err, data) => {
            if (err) return res.status(500).json(err);
            
            return res.status(200).json(data);
        });
    // });
};

export const getBook = (req: Request, res: Response) => {
  
    // const q = "SELECT b.id, `username`, `title`, `author`, `desc`, b.img, u.img AS userImg, `genre`, `status`, `dateread` FROM users u JOIN books b ON u.id = b.userid WHERE b.id = ?";

    // const q = "SELECT * FROM users u JOIN books b ON u.id = b.userid WHERE b.bookId = ?"

    // const q = "SELECT `title`, `subtitle`, `author`, `genre`,  `img`, `desc`,`pageCount`, `previewLink`, `language`, `publishedDate`, `bookid`, `dateread`,`status`, `userid` FROM books WHERE bookId = ? AND userid = ?"

    const bookId = req.params.bookid;
    const userId = Number(req.params.userid);
    const q = "SELECT `title`, `subtitle`, `author`, `genre`,  `img`, `desc`,`pageCount`, `previewLink`, `language`, `publishedDate`, `bookid`, `dateRead`,`status`, `userid` FROM books WHERE bookid = ? AND userid = ?"

    db.query(q, [bookId, userId], (err, data) => {
        if (err) return res.status(500).json("Book not in database");

        return res.status(200).json(data);
    });
};

export const addBook = (req: Request, res: Response) => {
    // 🚨 NEED TO FIX AUTHENTICATION 
    // const token = req.cookies.access_token;

    // if (!token) return res.status(401).json("Not authenticated!");

    // jwt.verify(token, process.env.JWT_KEY as string, (err:any, userInfo:any) => {
    //     if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO books(`title`, `subtitle`, `author`, `genre`,  `img`, `desc`,`pageCount`, `previewLink`, `language`, `publishedDate`, `bookid`, `dateRead`,`status`, `userid`) VALUES (?)";
    
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
            req.body.userid
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Book has been added.");
        });
    // });
};

export const deleteBook = (req: Request, res: Response) => {
    // 🚨 NEED TO CHANGE THIS FUNCTION SO THAT IT RETRIEVES BOOK THAT MATCHES BOOKID AND THAT THE USERID AND ID MATCH
    // delete book where id from users matches userid from books and bookid matches
    // const token = req.cookies.access_token;

    // if (!token) return res.status(401).json("Not authenticated!");

    // jwt.verify(token, process.env.JWT_KEY as string, (err: any, userInfo: any) => {
    //     if (err) return res.status(403).json("Token is not valid!");

        const bookId = req.params.bookid;
    const userId = Number(req.params.userid);
        const q = "DELETE FROM books WHERE `bookid` = ? AND `userid` = ?";

        db.query(q, [bookId, userId], (err: any, data: any) => {
            if (err) return res.status(403).json("You can only delete one of your books.");

            return res.json("The book has been deleted!");
        });
    // });
};

export const updateBook = (req: Request, res: Response) => {
    // 🚨 FIX AUTHENTICATION
    // const token = req.cookies.access_token;

    // if (!token) return res.status(401).json("Not authenticated!");

    // jwt.verify(token, process.env.JWT_KEY as string, (err: any, userInfo: any) => {
    //     if (err) return res.status(403).json("Token is not valid!");

    const bookId = req.params.bookid;
    const userId = Number(req.params.userid);
        const q = "UPDATE books SET `status`=?, `dateRead`=? WHERE `bookid`=? AND `userid`=?";

        const values = [
            req.body.status,
            req.body.dateRead,
        ];

        db.query(q, [...values, bookId, userId], (err: any, data: any) => {
            if (err) return res.status(500).json(err);

            return res.json("The book has been updated!");
        });
    // })
}