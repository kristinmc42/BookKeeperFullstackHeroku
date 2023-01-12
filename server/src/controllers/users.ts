import express, { Request, Response } from "express";
import { db } from "../db";

export const getAllUsers = (req: Request, res: Response) => {
    const q = req.query.status
        ? "SELECT * FROM users WHERE status=?"
        : "SELECT * FROM users";
    
    db.query(q, [req.query.status], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getUserId = (req: Request, res: Response) => {
    const q = "SELECT `id` FROM users WHERE username = ?";

    db.query(q, [req.params.name], (err, data) => {
        if (err) return res.status(500).json("User not in database");

        return res.status(200).json(data[0]);
    });
};

