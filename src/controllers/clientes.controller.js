import { pool } from "../config/db.js";

export const getClientes = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM clientes");
  res.json(rows);
};

export const createCliente = async (req, res) => {
  const { nombre, dni, telefono, fecha_inicio, fecha_fin } = req.body;

  await pool.query(
    `INSERT INTO clientes (nombre, dni, telefono, fecha_inicio, fecha_fin)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, dni, telefono, fecha_inicio, fecha_fin]
  );

  res.status(201).json({ message: "Cliente Creado" });
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, dni, telefono, fecha_inicio, fecha_fin, estado } = req.body;

  await pool.query(
    `UPDATE clientes 
     SET nombre=?, dni=?, telefono=?, fecha_inicio=?, fecha_fin=?, estado=?
     WHERE id=?`,
    [nombre, dni, telefono, fecha_inicio, fecha_fin, estado, id]
  );

  res.json({ message: "Cliente actualizado" });
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM clientes WHERE id=?", [id]);
  res.json({ message: "Cliente eliminado" });
};
