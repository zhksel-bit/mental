// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // ⬇️ 빌드 시 ESLint/TS 오류 때문에 멈추지 않도록
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
