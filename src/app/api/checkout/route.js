import connection from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { cartItems, shippingDetails, paymentDetails } = await req.json();

    // Obtener y validar el token
    const token = req.cookies?.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ message: "Usuario no autenticado" }),
        { status: 401 }
      );
    }

    // Decodificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Iniciar el registro del proceso de compra
    // 1. Registrar el documento
    const documentResult = await new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO documento (tipo_documento, tipo_pago) VALUES (?, ?)`,
        [paymentDetails.tipo_documento, paymentDetails.tipo_pago],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
    const id_documento = documentResult.insertId;

    // 2. Registrar el envío
    const envioResult = await new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO envio (direccion, destinatario, remitente, tiempo_estimado, valor, tiempo_llegada) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          shippingDetails.direccion,
          shippingDetails.destinatario,
          shippingDetails.remitente,
          shippingDetails.tiempo_estimado,
          shippingDetails.valor,
          shippingDetails.tiempo_llegada,
        ],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
    const id_envio = envioResult.insertId;

    // 3. Registrar la compra
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const compraResult = await new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO compra (id_documento, id_envio, detalle, cantidad, estado, total, fecha_creacion) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [
          id_documento,
          id_envio,
          "Compra de productos",
          cartItems.length,
          "pendiente", // Estado inicial
          total,
        ],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
    const id_compra = compraResult.insertId;

    // 4. Registrar detalles de la compra y actualizar stock
    await Promise.all(
      cartItems.map(async (item) => {
        const subtotal = item.price * item.quantity;
        const iva = subtotal * 0.19;
        const totalConIva = subtotal + iva;

        // Registrar detalle de la compra
        await new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO detalle_compra (id_compra, cantidad, precio_unitario, subtotal, total_sin_iva, iva, total_con_iva) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              id_compra,
              item.quantity,
              item.price,
              subtotal,
              subtotal,
              iva,
              totalConIva,
            ],
            (error) => {
              if (error) return reject(error);
              resolve();
            }
          );
        });

      // Descontar stock del producto
      await new Promise((resolve, reject) => {
        connection.query(
          `UPDATE productos SET stock = stock - ? WHERE id = ?`,
          [item.quantity, item.id],
          (error) => {
            if (error) return reject(error);
            resolve();
          }
        );
      });
    })
  );

    // Retornar respuesta exitosa
    return new Response(
      JSON.stringify({ message: "Compra registrada con éxito" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el proceso de compra:", error);

    // Manejo de errores
    return new Response(
      JSON.stringify({ message: "Error en el proceso de compra" }),
      { status: 500 }
    );
  }
}
