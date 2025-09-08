"use client";

import React from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import type { Metadata } from 'next';

// 메타데이터 정의 (서버 컴포넌트에서만 사용 가능하므로 클라이언트 컴포넌트에서는 제거)
// export const metadata: Metadata = {
//   title: '마음챙김 상담센터',
//   description: '익명으로 편안하게 마음을 나눌 수 있는 심리 상담 서비스',
// };

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <LayoutContainer>
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
        </LayoutContainer>
      </body>
    </html>
  );
}
