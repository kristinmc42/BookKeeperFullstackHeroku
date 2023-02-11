import express from "express";
import { getUserId } from "../controllers/users";

const router = express.Router();

// get the user id
router.get("/:username", getUserId);

export default router;
