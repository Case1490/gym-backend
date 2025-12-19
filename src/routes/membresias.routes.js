import { Router } from "express";
import {
  getMembresias,
  createMembresia,
  updateMembresia,
  deleteMembresia,
} from "../controllers/membresias.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getMembresias);
router.post("/", verifyToken, createMembresia);
router.put("/:id", verifyToken, updateMembresia);
router.delete("/:id", verifyToken, deleteMembresia);

export default router;
