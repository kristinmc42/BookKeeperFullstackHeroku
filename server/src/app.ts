import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";
import bookRoutes from "./routes/books";
import userRoutes from "./routes/users";

const app: Application = express();

app.use(express.json());

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//     res.send("<h1>Hello</h1>");
// })

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => console.log("Server is running"));