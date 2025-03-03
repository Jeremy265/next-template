import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
    },
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH
        ? `/${process.env.NEXT_PUBLIC_BASE_PATH}`
        : "",
    rewrites: async () => {
        return [
            {
                source: "/checks/:slug*",
                destination: "/documents/checks/:slug*",
            },
            {
                source: "/monitoring/:slug*",
                destination: "/documents/monitoring/:slug*",
            },
        ];
    },
};

if (process.env.NODE_ENV === "development")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default nextConfig;
