'use client'

export default function FAQ() {
  return (
    <div className="p-10 bg-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Preguntas Frecuentes
      </h1>
      {/* Puedes añadir más preguntas y respuestas aquí */}
      <div className="space-y-4">
        <div className="border-b border-gray-500 pb-4">
          <h3 className="text-lg font-semibold text-black">
            ¿Qué es ConnecTo y cómo funciona?
          </h3>
          <p className="text-sm text-black mt-2">
            ConnecTo es una plataforma que facilita la conexión entre
            emprendedores y clientes mediante perfiles personalizados, productos
            destacados y planes de suscripción.
          </p>
        </div>
        {/* Añade más secciones según sea necesario */}
      </div>
    </div>
  )
}
