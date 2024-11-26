import connection from "@/lib/db";
import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  try {
    const orders = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM orders WHERE user_id = ?",
        [userId],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    const orderItems = await Promise.all(
      orders.map(async (order) => {
        const items = await new Promise((resolve, reject) => {
          connection.query(
            "SELECT * FROM order_items WHERE order_id = ?",
            [order.id],
            (error, results) => {
              if (error) return reject(error);
              resolve(results);
            }
          );
        });
        return { ...order, items };
      })
    );

    return new Response(JSON.stringify({ orders: orderItems }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al recuperar pedidos:", error);
    return new Response(
      JSON.stringify({ message: "Error al recuperar pedidos" }),
      {
        status: 500,
      }
    );
  }
}
