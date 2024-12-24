import connection from '@/lib/db'
export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    // Obtener el término de búsqueda de los parámetros de consulta
    const { searchParams } = new URL(req.url)
    const searchTerm = searchParams.get('query') || ''

    // Consulta a la base de datos para obtener todos los productos, incluidas las imágenes
    const [results] = await connection.promise().query(
      `SELECT
        p.id_producto,
        p.nombre AS product_name,
        p.descripcion,
        p.precio,
        p.stock,
        pi.url_imagen,
        pn.id_perfil,
        pn.nombre_negocio AS business_name
       FROM productos p
       LEFT JOIN producto_imagenes pi ON p.id_producto = pi.id_producto
       LEFT JOIN perfil_negocio pn ON p.id_perfil = pn.id_perfil
       WHERE p.nombre LIKE ? OR p.descripcion LIKE ?`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    )

    // Agrupar los productos por su ID y consolidar las imágenes en un array
    const productMap = {}
    results.forEach((product) => {
      if (!productMap[product.id_producto]) {
        // Si el producto no está en el mapa, añadirlo
        productMap[product.id_producto] = {
          id: product.id_producto,
          name: product.product_name,
          description: product.descripcion,
          price: product.precio,
          stock: product.stock,
          images: product.url_imagen ? [product.url_imagen] : [], // Inicializar el array de imágenes
          businessName: product.business_name,
          id_perfil: product.id_perfil,
        }
      } else {
        // Si el producto ya está en el mapa, solo agregar la nueva imagen si existe
        if (product.url_imagen) {
          productMap[product.id_producto].images.push(product.url_imagen)
        }
      }
    })

    // Convertir el objeto de productos en un array
    const products = Object.values(productMap)

    // Respuesta exitosa
    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error al cargar productos:', error)
    return new Response(
      JSON.stringify({ message: 'Error al cargar productos' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
