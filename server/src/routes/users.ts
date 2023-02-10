import express from "express";
import { getUserId } from "../controllers/users";

const router = express.Router();

// get the user id
router.get("/:username", getUserId);

// get all users
// router.get("/", getAllUsers);
export default router;