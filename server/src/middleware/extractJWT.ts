import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface TokenInterface extends jwt.JwtPayload {
    id: number;
    iat: number;
}
  
const extraxtJWT = (req: Request, res: Response, next: NextFunction) => {
    
    const token: string | null = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");
  
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_KEY as jwt.Secret
      ) as TokenInterface;
        res.locals.jwt = decoded;
        next();
  
    } catch (err) {
      if (err) return res.status(403).json("Token is not valid!");
    }

}

export default extraxtJWT;