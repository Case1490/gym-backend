import { pool } from "../config/db.js";

export const createPago = async (req, res) => {
  const { cliente_id, membresia_id, metodo } = req.body;

  // 1️⃣ obtener membresía
  const [[membresia]] = await pool.query(
    "SELECT duracion_dias, precio FROM membresias WHERE id=?",
    [membresia_id]
  );

  if (!membresia) {
    return res.status(404).json({ message: "Membresía no encontrada" });
  }

  // 2️⃣ calcular fechas
  const fecha_inicio = new Date();
  const fecha_fin = new Date();
  fecha_fin.setDate(fecha_inicio.getDate() + membresia.duracion_dias);

  // 3️⃣ guardar pago
  await pool.query(
    `INSERT INTO pagos (cliente_id, membresia_id, monto, metodo)
     VALUES (?, ?, ?, ?)`,
    [cliente_id, membresia_id, membresia.precio, metodo]
  );

  // 4️⃣ actualizar cliente
  await pool.query(
    `UPDATE clientes
     SET fecha_inicio=?, fecha_fin=?, estado='activo'
     WHERE id=?`,
    [fecha_inicio, fecha_fin, cliente_id]
  );

  res.status(201).json({ message: "Pago registrado y membresía asignada" });
};

export const getPagos = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT p.id, c.nombre AS cliente, m.nombre AS membresia, p.monto, p.metodo, p.fecha
    FROM pagos p
    JOIN clientes c ON p.cliente_id = c.id
    JOIN membresias m ON p.membresia_id = m.id
    ORDER BY p.fecha DESC
  `);

  res.json(rows);
};
