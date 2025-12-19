import { Router } from "express";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/clientes.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getClientes);
router.post("/", verifyToken, createCliente);
router.put("/:id", verifyToken, updateCliente);
router.delete("/:id", verifyToken, deleteCliente);

export default router;
