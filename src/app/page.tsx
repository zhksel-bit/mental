"use client";

import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  max-width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 15px 30px;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ConsultationButton = styled(StyledButton)`
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
`;

const ChatbotButton = styled(StyledButton)`
  background: linear-gradient(45deg, #4ecdc4, #88d8b0);
  color: white;
`;

const FAQButton = styled(StyledButton)`
  background: linear-gradient(45deg, #a8e6cf, #dcedc1);
  color: #333;
`;

export default function Home() {
  return (
    <MainContainer>
      <Title>마음챙김 상담센터</Title>
      <Description>
        언제든지 편안하게 마음을 나눌 수 있는 공간입니다. 
        익명으로 상담을 신청하거나, AI 챗봇과 대화를 나눠보세요.
      </Description>
      <ButtonGroup>
        <ConsultationButton onClick={() => window.location.href = '/consultation/new'}>
          상담 신청하기
        </ConsultationButton>
        <ChatbotButton onClick={() => window.location.href = '/chat'}>
          AI 챗봇 상담
        </ChatbotButton>
        <FAQButton onClick={() => window.location.href = '/faq'}>
          FAQ & 정보 게시판
        </FAQButton>
      </ButtonGroup>
    </MainContainer>
  );
}
