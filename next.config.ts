import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,   // 기존 옵션 유지
  },
  eslint: {
    // 빌드 시 ESLint 오류가 있어도 실패하지 않음
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 타입 오류가 있어도 빌드 실패하지 않음
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
