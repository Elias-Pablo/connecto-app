import connection from '@/lib/db'

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const period = url.searchParams.get('period')
    const id_perfil = url.searchParams.get('id_perfil')
    const page = parseInt(url.searchParams.get('page'), 10) || 1
    const daysPerPage = 7

    if (!id_perfil) {
      return new Response(JSON.stringify({ message: 'Falta el id_perfil' }), {
        status: 400,
      })
    }

    let metricsQuery, formattedMetrics, totalPages

    if (period === 'daily') {
      // Generar fechas del mes actual
      const startDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      )
      const endDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      )
      const allDates = Array.from(
        { length: (endDate - startDate) / (1000 * 60 * 60 * 24) + 1 },
        (_, i) => new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24))
      ).map((d) => d.toISOString().split('T')[0])

      const startIndex = (page - 1) * daysPerPage
      const endIndex = startIndex + daysPerPage
      const paginatedDates = allDates.slice(startIndex, endIndex)

      metricsQuery = `
       SELECT DATE_FORMAT(fecha_interaccion, '%Y-%m-%d') AS fecha,
       COUNT(CASE WHEN tipo_interaccion = 'View' THEN 1 ELSE NULL END) AS total_views,
       SUM(CASE WHEN tipo_interaccion = 'Purchase' THEN cantidad ELSE 0 END) AS total_purchases
FROM interacciones
WHERE id_perfil = ?
  AND DATE(fecha_interaccion) BETWEEN ? AND ?
GROUP BY fecha
ORDER BY fecha ASC
      `

      const metrics = await new Promise((resolve, reject) => {
        connection.query(
          metricsQuery,
          [
            id_perfil,
            startDate.toISOString().split('T')[0],
            endDate.toISOString().split('T')[0],
          ],
          (error, results) => {
            if (error) return reject(error)
            resolve(results)
          }
        )
      })

      const metricsMap = metrics.reduce(
        (acc, { fecha, total_views, total_purchases }) => {
          acc[fecha] = {
            views: total_views || 0,
            purchases: total_purchases || 0,
          }
          return acc
        },
        {}
      )

      formattedMetrics = paginatedDates.map((date) => ({
        fecha: date,
        views: metricsMap[date]?.views || 0,
        purchases: metricsMap[date]?.purchases || 0,
      }))

      totalPages = Math.ceil(allDates.length / daysPerPage)
    } else if (['weekly', 'monthly'].includes(period)) {
      const groupBy =
        period === 'weekly'
          ? 'YEAR(fecha_interaccion), WEEK(fecha_interaccion)'
          : 'YEAR(fecha_interaccion), MONTH(fecha_interaccion)'

      metricsQuery = `
        SELECT ${groupBy} AS periodo,
               COUNT(CASE WHEN tipo_interaccion = 'View' THEN 1 ELSE NULL END) AS total_views,
               SUM(CASE WHEN tipo_interaccion = 'Purchase' THEN cantidad ELSE 0 END) AS total_purchases
        FROM interacciones
        WHERE id_perfil = ?
        GROUP BY periodo
        ORDER BY periodo ASC
      `

      const metrics = await new Promise((resolve, reject) => {
        connection.query(metricsQuery, [id_perfil], (error, results) => {
          if (error) return reject(error)
          resolve(results)
        })
      })

      formattedMetrics = metrics.map(
        ({ periodo, total_views, total_purchases }) => ({
          fecha: periodo,
          views: total_views || 0,
          purchases: total_purchases || 0,
        })
      )
    } else {
      return new Response(JSON.stringify({ message: 'Período no válido' }), {
        status: 400,
      })
    }

    // Query para el resumen
    const resumenQuery = `
      SELECT
        COUNT(CASE WHEN tipo_interaccion = 'View' THEN 1 ELSE NULL END) AS visitas,
        SUM(CASE WHEN tipo_interaccion = 'Purchase' THEN cantidad ELSE 0 END) AS ventas,
        SUM(CASE WHEN tipo_interaccion = 'Purchase' THEN cantidad * p.precio ELSE 0 END) AS ingresos
      FROM interacciones i
      LEFT JOIN productos p ON i.id_producto = p.id_producto
      WHERE i.id_perfil = ?;
    `

    const resumen = await new Promise((resolve, reject) => {
      connection.query(resumenQuery, [id_perfil], (error, results) => {
        if (error) return reject(error)
        resolve(results[0])
      })
    })

    return new Response(
      JSON.stringify({
        metrics: { [period]: formattedMetrics },
        resumen,
        totalPages: totalPages || null,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error en la API de métricas:', error)
    return new Response(
      JSON.stringify({ message: 'Error al obtener métricas' }),
      { status: 500 }
    )
  }
}
