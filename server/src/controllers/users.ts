import express, { Request, Response } from "express";
import { getUserByName } from "../db";

export const getUserId = async (req: Request, res: Response) => {
  const userId = await getUserByName(req.params.username).catch((err) => {
    console.error(err.stack);
    return res.status(500).json("User not in database");
  });
  console.log(userId[0]);
  return userId[0];
};

// export const getAllUsers = (req: Request, res: Response) => {
//     const q = req.query.status
//         ? "SELECT * FROM users WHERE status=?"
//         : "SELECT * FROM users";

//     db.query(q, [req.query.status], (err:any, data:any) => {
//         if (err) return res.status(500).json(err);

//         return res.status(200).json(data);
//     });
// };
