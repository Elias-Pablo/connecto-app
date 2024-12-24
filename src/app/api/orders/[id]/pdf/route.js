import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import path from 'path'
import connection from '@/lib/db'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

export async function GET(req, { params }) {
  try {
    const token = req.cookies.get('token')?.value
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId
    const { id } = params // Obtener el id_compra de los parámetros

    // Consultar el pedido
    const order = await new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM compra WHERE id_compra = ? AND id_usuario = ?',
        [id, userId],
        (error, results) => {
          if (error) return reject(error)
          if (results.length === 0)
            return reject(new Error('Pedido no encontrado'))
          resolve(results[0])
        }
      )
    })

    // Consultar los detalles del pedido
    const orderItems = await new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM detalle_compra WHERE id_compra = ?',
        [id],
        (error, results) => {
          if (error) return reject(error)
          resolve(results)
        }
      )
    })

    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 800])

    // Agregar el logo
    const logoPath = path.resolve('./public/Connecto-logo-horizontal2.png')
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath)
      const logoImage = await pdfDoc.embedPng(logoBytes)
      page.drawImage(logoImage, {
        x: 50,
        y: 700,
        width: 100,
        height: 100,
      })
    }

    // Información del pedido
    page.drawText(`Pedido ID: ${order.id_compra}`, { x: 50, y: 650, size: 16 })
    page.drawText(`Fecha: ${new Date(order.fecha_creacion).toLocaleString()}`, {
      x: 50,
      y: 630,
      size: 12,
    })
    page.drawText(`Total: $${order.total}`, { x: 50, y: 610, size: 12 })

    // Detalle de los productos
    let y = 580
    page.drawText('Productos:', { x: 50, y, size: 14 })
    y -= 20

    for (const item of orderItems) {
      page.drawText(
        `${item.productos_comprados} - ${item.cantidad} x $${item.precio_unitario}`,
        { x: 50, y, size: 12 }
      )
      y -= 20
    }

    // Serializar el documento PDF
    const pdfBytes = await pdfDoc.save()

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=pedido_${id}.pdf`,
      },
    })
  } catch (error) {
    console.error('Error al generar el PDF:', error)
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      {
        status: 500,
      }
    )
  }
}
