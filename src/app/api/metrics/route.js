import connection from "@/lib/db";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const period = url.searchParams.get("period"); // 'daily', 'weekly', 'monthly'
    const id_perfil = url.searchParams.get("id_perfil"); // ID del perfil del emprendedor

    if (!id_perfil) {
      return new Response(
        JSON.stringify({ message: "Falta el id_perfil" }),
        { status: 400 }
      );
    }

    let groupBy;
    if (period === "daily") {
      groupBy = "DATE(fecha_interaccion)";
    } else if (period === "weekly") {
      groupBy = "YEAR(fecha_interaccion), WEEK(fecha_interaccion)";
    } else if (period === "monthly") {
      groupBy = "YEAR(fecha_interaccion), MONTH(fecha_interaccion)";
    } else {
      return new Response(
        JSON.stringify({ message: "Período no válido" }),
        { status: 400 }
      );
    }

    const query = 
      `SELECT ${groupBy} AS periodo, tipo_interaccion,
             SUM(cantidad) AS total
      FROM interacciones
      WHERE id_perfil = ?
      GROUP BY periodo, tipo_interaccion
      ORDER BY periodo ASC`;
    

    const metrics = await new Promise((resolve, reject) => {
      connection.query(query, [id_perfil], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    const formattedMetrics = {
      daily: { views: [], purchases: [] },
      weekly: { views: [], purchases: [] },
      monthly: { views: [], purchases: [] },
    };

    // Rellenar los días faltantes (si es daily)
    if (period === "daily") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6); // Últimos 7 días
      const days = [];
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const formattedDate = currentDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD
        days.push({
          fecha: formattedDate,
          day: currentDate.toLocaleDateString("es-ES", { weekday: "long" }),
        });
      }

      days.forEach((day) => {
        const viewData = metrics.find(
          (m) =>
            m.periodo === day.fecha && m.tipo_interaccion === "View"
        );
        const purchaseData = metrics.find(
          (m) =>
            m.periodo === day.fecha && m.tipo_interaccion === "Purchase"
        );

        formattedMetrics.daily.views.push({
          fecha: day.day,
          total: viewData ? viewData.total : 0,
        });
        formattedMetrics.daily.purchases.push({
          fecha: day.day,
          total: purchaseData ? purchaseData.total : 0,
        });
      });
    } else {
      metrics.forEach((row) => {
        const { periodo, tipo_interaccion, total } = row;
        if (tipo_interaccion === "View") {
          formattedMetrics[period].views.push({ fecha: periodo, total });
        } else if (tipo_interaccion === "Purchase") {
          formattedMetrics[period].purchases.push({ fecha: periodo, total });
        }
      });
    }

    return new Response(JSON.stringify({ metrics: formattedMetrics }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener métricas:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener métricas" }),
      { status: 500 }
    );
  }
}