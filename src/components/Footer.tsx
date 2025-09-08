import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.footer`
  background: #333;
  color: white;
  padding: 3rem 2rem 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ffd54f;
`;

const FooterLink = styled(Link)`
  color: #ddd;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #ffd54f;
  }
`;

const FooterText = styled.p`
  color: #ddd;
  line-height: 1.6;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #555;
  color: #aaa;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s;
  
  &:hover {
    color: #ffd54f;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>마음챙김 상담센터</FooterTitle>
          <FooterText>
            익명으로 편안하게 마음을 나눌 수 있는 공간입니다.
            언제든지 당신의 마음을 지켜주는 상담 서비스를 제공합니다.
          </FooterText>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">f</SocialLink>
            <SocialLink href="#" aria-label="Twitter">t</SocialLink>
            <SocialLink href="#" aria-label="Instagram">i</SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>서비스</FooterTitle>
          <FooterLink href="/consultation/new">상담 신청</FooterLink>
          <FooterLink href="/chat">AI 상담</FooterLink>
          <FooterLink href="/faq">FAQ & 정보</FooterLink>
          <FooterLink href="/privacy">개인정보 처리방침</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>고객지원</FooterTitle>
          <FooterLink href="/contact">문의하기</FooterLink>
          <FooterLink href="/terms">이용약관</FooterLink>
          <FooterLink href="/accessibility">접근성 정책</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>연락처</FooterTitle>
          <FooterText>전화: 1588-XXXX</FooterText>
          <FooterText>이메일: support@mindcare.co.kr</FooterText>
          <FooterText>운영시간: 평일 09:00 - 18:00</FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} 마음챙김 상담센터. 모든 권리가 보호됩니다.
      </Copyright>
    </FooterContainer>
  );
}