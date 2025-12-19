import { pool } from "../config/db.js";

export const getMembresias = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM membresias");
  res.json(rows);
};

export const createMembresia = async (req, res) => {
  const { nombre, duracion_dias, precio } = req.body;

  await pool.query(
    `INSERT INTO membresias (nombre, duracion_dias, precio)
     VALUES (?, ?, ?)`,
    [nombre, duracion_dias, precio]
  );

  res.status(201).json({ message: "Membresía creada" });
};

export const updateMembresia = async (req, res) => {
  const { id } = req.params;
  const { nombre, duracion_dias, precio } = req.body;

  await pool.query(
    `UPDATE membresias
     SET nombre=?, duracion_dias=?, precio=?
     WHERE id=?`,
    [nombre, duracion_dias, precio, id]
  );

  res.json({ message: "Membresía actualizada" });
};

export const deleteMembresia = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM membresias WHERE id=?", [id]);
  res.json({ message: "Membresía eliminada" });
};
