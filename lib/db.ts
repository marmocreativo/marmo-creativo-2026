import mysql from "mysql2/promise"

// Pool único (se reutiliza entre recargas en desarrollo).
const globalForDb = globalThis as unknown as { pool?: mysql.Pool }

export const db =
    globalForDb.pool ??
    mysql.createPool({
        host: process.env.DB_HOST ?? "127.0.0.1",
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER ?? "root",
        password: process.env.DB_PASSWORD ?? "",
        database: process.env.DB_NAME ?? "marmo_creativo",
        charset: "utf8mb4",
        dateStrings: true, // DATE llega como "2026-10-19", no como objeto Date
        connectionLimit: 10,
        waitForConnections: true,
    })

// Todas las conexiones trabajan en UTC: así created_at significa lo mismo en Laragon y en Docker.
if (!globalForDb.pool) db.on("connection", (conn) => conn.query("SET time_zone = '+00:00'"))

if (process.env.NODE_ENV !== "production") globalForDb.pool = db
