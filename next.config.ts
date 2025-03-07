import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH
        ? `/${process.env.NEXT_PUBLIC_BASE_PATH}`
        : "",
};

if (process.env.NODE_ENV === "development")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default nextConfig;
