import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
    email,
  ]);

  if (rows.length === 0) {
    res.status(401).jsonn({ message: "Credenciales incorrectas" });
    return;
  }

  const user = rows[0];
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(401).json({ message: "Credenciales incorrectas" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      rol: user.rol,
    },
  });
};
