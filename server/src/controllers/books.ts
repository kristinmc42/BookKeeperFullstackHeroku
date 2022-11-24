import express, { Application, Request, Response, NextFunction } from "express";
import { userInfo } from "os";
import { db } from "../db";
import jwt from "jsonwebtoken";

export const getAllBooks = (req: Request, res: Response) => {
    const q = req.query.status
        ? "SELECT * FROM books WHERE status=?"
        : "SELECT * FROM posts";
    
    db.query(q, [req.query.status], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getBook = (req: Request, res: Response) => {
    const q = "SELECT b.id, `username`, `title`, `author`, `desc`, b.img, u.img AS userImg, `genre`, `status`, `dateread` FROM users u JOIN books p ON u.id = b.userid WHERE b.id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

export const addBook = (req: Request, res: Response) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err:any, userInfo:any) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO books(`title`, `author`, `desc`, `img`, `genre`, `status`, `dateread`, `userid`) VALUES (?)";
    
        const values = [
            req.body.title,
            req.body.author,
            req.body.desc,
            req.body.img,
            req.body.genre,
            req.body.status,
            req.body.dateread,
            userInfo.id
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Book has been added.");
        });
    });
};

export const deleteBook = (req: Request, res: Response) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo: any) => {
        if (err) return res.status(403).json("Token is not valid!");

        const bookId = req.params.id;
        const q = "DELETE FROM books WHERE `id` = ? AND `userid` = ?";

        db.query(q, [bookId, userInfo.id], (err: any, data: any) => {
            if (err) return res.status(403).json("You can only delete one of your books.");

            return res.json("The book has been deleted!");
        });
    });
};

export const updateBook = (req: Request, res: Response) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo: any) => {
        if (err) return res.status(403).json("Token is not valid!");

        const bookId = req.params.id;
        const q = "UPDATE books SET `title`=?, `author`=?, `desc`=?, `img`=?, `genre`=?, `status`=?, `dateread`=?, WHERE `id`=? AND `userid`=?";

        const values = [
            req.body.title,
            req.body.author,
            req.body.desc,
            req.body.img,
            req.body.genre,
            req.body.status,
            req.body.dateread,
        ];

        db.query(q, [...values,bookId, userInfo.id], (err: any, data: any) => {
            if (err) return res.status(500).json(err);

            return res.json("The book has been updated!");
        });
    })
}