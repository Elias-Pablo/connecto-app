import connection from "@/lib/db";
import { jwtDecode } from "jwt-decode";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Token no proporcionado" }),
        { status: 401 }
      );
    }

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    return new Promise((resolve, reject) => {
      const profileQuery = `SELECT id_perfil FROM perfil_negocio WHERE id_usuario = ?`;

      connection.query(profileQuery, [userId], (error, profileResults) => {
        if (error || profileResults.length === 0) {
          console.error("Error al obtener id_perfil:", error);
          resolve(
            new Response(JSON.stringify({ message: "Perfil no encontrado" }), {
              status: 404,
            })
          );
          return;
        }

        const id_perfil = profileResults[0].id_perfil;

        const metricsQuery = `
          SELECT tipo_metrica, intervalo, cantidad, fecha_creacion
          FROM metricas
          WHERE id_perfil = ?
          ORDER BY fecha_creacion ASC
        `;

        connection.query(metricsQuery, [id_perfil], (error, metricsResults) => {
          if (error) {
            console.error("Error al obtener métricas:", error);
            resolve(
              new Response(
                JSON.stringify({ message: "Error al obtener métricas" }),
                { status: 500 }
              )
            );
            return;
          }

          if (metricsResults.length === 0) {
            resolve(
              new Response(JSON.stringify({ metrics: null }), { status: 200 })
            );
            return;
          }

          const formattedData = {
            daily: { visits: [], sales: [] },
            weekly: { visits: [], sales: [] },
            monthly: { visits: [], sales: [] },
          };

          metricsResults.forEach((row) => {
            const { tipo_metrica, intervalo, cantidad } = row;
            if (intervalo === "diarias") {
              formattedData.daily[
                tipo_metrica === "visitas" ? "visits" : "sales"
              ].push(cantidad);
            } else if (intervalo === "semanales") {
              formattedData.weekly[
                tipo_metrica === "visitas" ? "visits" : "sales"
              ].push(cantidad);
            } else if (intervalo === "mensuales") {
              formattedData.monthly[
                tipo_metrica === "visitas" ? "visits" : "sales"
              ].push(cantidad);
            }
          });

          resolve(
            new Response(JSON.stringify({ metrics: formattedData }), {
              status: 200,
            })
          );
        });
      });
    });
  } catch (error) {
    console.error("Error al procesar el token:", error);
    return new Response(JSON.stringify({ message: "Token inválido" }), {
      status: 401,
    });
  }
}
