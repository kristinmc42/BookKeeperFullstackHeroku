import * as dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";
import bookRoutes from "./routes/books";
import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";
import cors from "cors";
import { MysqlError } from "mysql";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000/",
      "https://bookkeeperfullstack-production.up.railway.app",
      "https://www.googleapis.com/books",
      "https://book-keeper-revisited.netlify.app/",
    ],
    credentials: true,
  })
  );
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
  
app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})

app.use(
  (err: MysqlError | any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

app.listen(PORT, () => console.log("Server is running"));

module.exports = app;
