import * as dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import authRoutes from "./routes/auth";
import bookRoutes from "./routes/books";
import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*'
}));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Server is running"));
