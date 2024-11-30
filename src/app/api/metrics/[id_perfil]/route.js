import connection from "@/lib/db";

export async function GET(req, { params }) {
  const { id_perfil } = params;

  if (!id_perfil) {
    return new Response(JSON.stringify({ message: "Profile ID is required" }), {
      status: 400,
    });
  }

  return new Promise((resolve, reject) => {
    const query = `
      SELECT tipo_metrica, intervalo, cantidad, fecha_creacion
      FROM metricas
      WHERE id_perfil = ? 
      ORDER BY fecha_creacion ASC
    `;

    connection.query(query, [id_perfil], (error, results) => {
      if (error) {
        console.error("Error al obtener métricas:", error);
        reject(new Response(JSON.stringify({ message: "Error al obtener métricas" }), { status: 500 }));
      } else {
        const formattedData = { daily: { visits: [], sales: [] }, weekly: { visits: [], sales: [] }, monthly: { visits: [], sales: [] } };

        results.forEach((row) => {
          const { tipo_metrica, intervalo, cantidad } = row;
          if (intervalo === "diarias") {
            formattedData.daily[tipo_metrica === "visitas" ? "visits" : "sales"].push(cantidad);
          } else if (intervalo === "semanales") {
            formattedData.weekly[tipo_metrica === "visitas" ? "visits" : "sales"].push(cantidad);
          } else if (intervalo === "mensuales") {
            formattedData.monthly[tipo_metrica === "visitas" ? "visits" : "sales"].push(cantidad);
          }
        });

        resolve(new Response(JSON.stringify({ metrics: formattedData }), { status: 200 }));
      }
    });
  });
}
