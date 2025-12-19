import { Router } from "express";
import {
  getResumen,
  getVencimientos,
  getUltimosPagos,
} from "../controllers/dashboard.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/resumen", verifyToken, getResumen);
router.get("/vencimientos", verifyToken, getVencimientos);
router.get("/ultimos-pagos", verifyToken, getUltimosPagos);

export default router;
