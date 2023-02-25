import * as dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import bookRoutes from "./routes/books";
import userRoutes from "./routes/users";
import { MysqlError } from "mysql";

const app: Application = express();

// check that all .env variables have values
if (!(process.env.PORT && process.env.DB_HOST && process.env.DB_USER && process.env.DB_DATABASE && process.env.DB_PASSWORD && process.env.JWT_KEY)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
    );
  }
  
const PORT = process.env.PORT || 8080;
  
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body
app.use(cookieParser()); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(helmet()); //helps you secure Express apps by setting various HTTP headers
// app.use(
//   helmet.crossOriginResourcePolicy({
//       policy: "cross-origin"
//   })
// );
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://bookkeeperfullstack-production.up.railway.app",
      "https://www.googleapis.com/books",
      "https://book-keeper-revisited.netlify.app",
      "https://book-keeper-fullstack.vercel.app",
      "https://book-keeper-fullstack-lpwt.vercel.app",
      "https://book-keeper-api.herokuapp.com/"
    ],
    credentials: true,
  })
  );
  // When using cors middleware as an application level middleware (for example, app.use(cors())), pre-flight requests are already handled for all routes

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
  
app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript app')
})

app.use(
  (err: MysqlError | any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

app.listen(PORT, () => console.log("Server is running"));

module.exports = app;
