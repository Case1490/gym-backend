import { pool } from "../config/db.js";

// 1️⃣ Resumen general
export const getResumen = async (req, res) => {
  const [[activos]] = await pool.query(
    "SELECT COUNT(*) AS total FROM clientes WHERE estado='activo'"
  );

  const [[vencidos]] = await pool.query(
    "SELECT COUNT(*) AS total FROM clientes WHERE estado='vencido'"
  );

  const [[ingresos]] = await pool.query(`
    SELECT IFNULL(SUM(monto), 0) AS total
    FROM pagos
    WHERE MONTH(fecha) = MONTH(CURRENT_DATE())
      AND YEAR(fecha) = YEAR(CURRENT_DATE())
  `);

  res.json({
    clientes_activos: activos.total,
    clientes_vencidos: vencidos.total,
    ingresos_mes: ingresos.total,
  });
};

// 2️⃣ Próximos vencimientos (7 días)
export const getVencimientos = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT id, nombre, fecha_fin
    FROM clientes
    WHERE fecha_fin BETWEEN CURRENT_DATE()
    AND DATE_ADD(CURRENT_DATE(), INTERVAL 7 DAY)
    ORDER BY fecha_fin
  `);

  res.json(rows);
};

// 3️⃣ Últimos pagos
export const getUltimosPagos = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT c.nombre AS cliente, m.nombre AS membresia, p.monto, p.metodo, p.fecha
    FROM pagos p
    JOIN clientes c ON p.cliente_id = c.id
    JOIN membresias m ON p.membresia_id = m.id
    ORDER BY p.fecha DESC
    LIMIT 5
  `);

  res.json(rows);
};
