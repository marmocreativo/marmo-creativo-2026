import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: "standalone",
    // El servidor lee y escribe en uploads/ y database/ en tiempo de ejecución; el trazado automático lo detecta como
    // "todo el proyecto" y los copiaría dentro de la salida standalone. Aquí se excluyen: uploads es un volumen y
    // database/ se copia aparte en el Dockerfile (sin los seeds con datos de clientes).
    outputFileTracingExcludes: {
        "*": ["./uploads/**", "./database/**", "./docs/**", "./.env*", "./*.md", "./Dockerfile", "./docker-compose.yml"],
    },
    experimental: {
        // Subida de imágenes por formulario (hasta 10 por vez de 8 MB cada una, validadas en el servidor).
        serverActions: { bodySizeLimit: "30mb" },
    },
    async redirects() {
        return [
            { source: "/home.html", destination: "/", permanent: true },
            { source: "/outsourcing-creativo", destination: "/outsourcing", permanent: true },
        ]
    },
}

export default nextConfig
