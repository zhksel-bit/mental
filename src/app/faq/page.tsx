"use client";

import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin: 30px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #ffd54f;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FAQItem = styled.div`
  background: #fffde7;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FAQQuestion = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  &::before {
    content: "Q.";
    margin-right: 10px;
    font-weight: bold;
    color: #ffa000;
  }
`;

const FAQAnswer = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
`;

const ArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ArticleCard = styled.div`
  background: #e8f5e9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ArticleTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 10px;
`;

const ArticlePreview = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 30px 0 0 30px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #ffd54f;
  }
`;

const SearchButton = styled.button`
  padding: 15px 25px;
  background: #ffd54f;
  color: #333;
  border: none;
  border-radius: 0 30px 30px 0;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #ffc107;
  }
`;

// FAQ 데이터
const faqData = [
  {
    id: 1,
    question: "상담은 어떻게 신청하나요?",
    answer: "홈페이지의 '상담 신청하기' 버튼을 클릭하시면 상담 신청 폼이 나타납니다. 간단한 정보를 입력하신 후 제출하시면 됩니다. 모든 상담은 익명으로 처리됩니다."
  },
  {
    id: 2,
    question: "상담사의 답변은 얼마나 걸리나요?",
    answer: "평균적으로 1-2 영업일 내에 답변을 받으실 수 있습니다. 다만, 상담 내용의 복잡성이나 상담사의 일정에 따라 다소 지연될 수 있습니다."
  },
  {
    id: 3,
    question: "상담 내용은 외부에 노출되나요?",
    answer: "절대 노출되지 않습니다. 모든 상담 내용은 암호화되어 저장되며, 상담사 외에는 접근할 수 없습니다. 개인정보 보호에 최선을 다하고 있습니다."
  },
  {
    id: 4,
    question: "AI 챗봇은 어떤 역할을 하나요?",
    answer: "AI 챗봇은 간단한 고민이나 감정적인 위로가 필요한 경우 즉시 도움을 드릴 수 있습니다. 하지만 심각한 문제나 전문적인 상담이 필요한 경우에는 전문 상담사를 연결해드립니다."
  }
];

// 정보 게시글 데이터
const articleData = [
  {
    id: 1,
    title: "스트레스 관리 방법 5가지",
    preview: "현대 사회에서 스트레스는 피할 수 없는 문제입니다. 효과적인 스트레스 관리 방법을 알아보세요...",
    content: "현대 사회에서 스트레스는 피할 수 없는 문제입니다. 효과적인 스트레스 관리 방법을 알아보세요. 1. 규칙적인 운동 2. 충분한 수면 3. 명상과 호흡 훈련 4. 사회적 지지 활용 5. 시간 관리"
  },
  {
    id: 2,
    title: "불안장애의 증상과 대처법",
    preview: "불안장애는 일상생활에 큰 영향을 미칠 수 있습니다. 주요 증상과 효과적인 대처 방법을 소개합니다...",
    content: "불안장애는 일상생활에 큰 영향을 미칠 수 있습니다. 주요 증상과 효과적인 대처 방법을 소개합니다. 증상: 지속적인 걱정, 초조함, 심장 박동 증가, 땀, 떨림 등. 대처법: 전문가 상담, 약물 치료, 자기 조절 기술 등."
  },
  {
    id: 3,
    title: "대인관계에서의 건강한 경계 설정",
    preview: "건강한 인간관계를 위해서는 적절한 경계 설정이 필요합니다. 그 방법을 알아봅시다...",
    content: "건강한 인간관계를 위해서는 적절한 경계 설정이 필요합니다. 그 방법을 알아봅시다. 1. 자신의 감정과 필요를 인식하기 2. 말할 수 있는 용기를 기르기 3. 존중받는 관계 유지하기 4. 타인의 경계도 인정하기"
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArticles = articleData.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <ContentContainer>
        <Title>FAQ & 정보 게시판</Title>
        
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
          <SearchButton>검색</SearchButton>
        </SearchBar>
        
        <SectionTitle>자주 묻는 질문</SectionTitle>
        <FAQList>
          {filteredFAQs.map(faq => (
            <FAQItem key={faq.id}>
              <FAQQuestion>{faq.question}</FAQQuestion>
              <FAQAnswer>{faq.answer}</FAQAnswer>
            </FAQItem>
          ))}
        </FAQList>
        
        <SectionTitle>심리 건강 정보</SectionTitle>
        <ArticleList>
          {filteredArticles.map(article => (
            <ArticleCard key={article.id}>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticlePreview>{article.preview}</ArticlePreview>
            </ArticleCard>
          ))}
        </ArticleList>
      </ContentContainer>
    </PageContainer>
  );
}