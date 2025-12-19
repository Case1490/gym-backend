import { Router } from "express";
import { createPago, getPagos } from "../controllers/pagos.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, createPago);
router.get("/", verifyToken, getPagos);

export default router;
