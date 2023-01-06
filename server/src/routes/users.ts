import express from "express";
import { getUserId, getAllUsers } from "../controllers/users";

const router = express.Router();

// get the user id
router.get("/:name", getUserId);

// get all users
router.get("/", getAllUsers);
export default router;