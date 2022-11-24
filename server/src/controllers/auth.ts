import express, { Application, Request, Response, NextFunction } from "express";
import { db } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req: Request, res: Response) => {

    // CHECK EXISTING USER
    const q: string = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // hash the password and create a user
        const salt: string = bcrypt.genSaltSync(10);
        const hash: string = bcrypt.hashSync(req.body.password, salt);

        const q: string = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
        const values: string[] = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
    });
};

export const login = (req: Request, res: Response) => {
    // CHECK USER
    const q: string = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //CHECK PASSWORD
        const isPasswordCorrect: boolean = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].id }, "jwtkey"); // change jwtkey to env varaible
        
        const { password, ...other } = data[0]; // separating out password so that we are not sending it with the other information

        // hhtpOnly means any script in browser can not reach cookie directly it is only for making API requests
        res.cookie("access_token", token, { httpOnly: true, }).status(200).json(other);

    });
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
};