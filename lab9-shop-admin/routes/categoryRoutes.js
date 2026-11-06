import express from "express";

import {
  getAll,
  create
} from "../controllers/categoryController.js";

const router = express.Router();

// Только GET и POST — как требуется в ЛР 9
router.get("/", getAll);
router.post("/", create);

export default router;
