import express from "express";
import { compareChars } from "../controllers/character.controller.js";


const router = express.Router();

router.post("/characterOfTheDay", compareChars)
 
export default router;