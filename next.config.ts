// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,   // ✅ ESLint 에러 무시
  },
  typescript: {
    ignoreBuildErrors: true,    // ✅ TS 타입 에러 무시
  },
};

export default nextConfig;
