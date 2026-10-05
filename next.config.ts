import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: "standalone",
    async redirects() {
        return [
            { source: "/home.html", destination: "/", permanent: true },
            { source: "/outsourcing-creativo", destination: "/outsourcing", permanent: true },
        ]
    },
}

export default nextConfig
