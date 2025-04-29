import express from "express";

import { getBook, postBook } from "../controllers/book.controllers.js";

const router = express.Router();

router.get("/",getBook);


export default router;