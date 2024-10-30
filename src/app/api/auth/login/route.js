import connection from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log("Datos recibidos:", body);

    const query = "SELECT * FROM usuarios WHERE email = ?";
    const [results] = await new Promise((resolve, reject) => {
      connection.query(query, [email], (err, results) => {
        if (err) {
          console.error("Error en la consulta:", err);
          reject(err);
        } else {
          console.log("Resultados de la consulta:", results);
          resolve(results);
        }
      });
    });

    const user = results[0];
    if (user && user.contraseña === password) {
      console.log("Inicio de sesión exitoso");
      return new Response(
        JSON.stringify({ success: true, message: "Inicio de sesión exitoso" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Email o contraseña incorrectos" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al iniciar sesión" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

