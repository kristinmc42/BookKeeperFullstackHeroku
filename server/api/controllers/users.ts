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
