import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenInterface extends jwt.JwtPayload {
  id: number;
  iat: number;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check authenticated
  const token: string | null = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as jwt.Secret);
    const user = decoded as TokenInterface;
    req.params.userId = user.id.toString();
    return next();
  } catch {
    return res.status(401).json("Not authenticated!");
  }
};
