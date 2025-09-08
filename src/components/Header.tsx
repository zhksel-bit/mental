"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from '@/components/Button';

interface MobileMenuProps {
  isOpen: boolean;
}

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff6b6b;
  text-decoration: none;
  
  &:hover {
    color: #ff5252;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<MobileMenuProps>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MobileNavLink = styled(Link)`
  font-weight: 500;
  color: #333;
  text-decoration: none;
  padding: 0.5rem 0;
  
  &:hover {
    color: #ff6b6b;
  }
`;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <HeaderContainer>
      <Nav>
        <Logo href="/">마음챙김</Logo>
        
        <NavLinks>
          <NavLink href="/consultation/new">상담 신청</NavLink>
          <NavLink href="/chat">AI 상담</NavLink>
          <NavLink href="/faq">FAQ & 정보</NavLink>
        </NavLinks>
        
        <AuthButtons>
          <Button size="small" variant="secondary">로그인</Button>
          <Button size="small">회원가입</Button>
        </AuthButtons>
        
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </MobileMenuButton>
      </Nav>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLinks>
          <MobileNavLink href="/consultation/new" onClick={() => setIsMobileMenuOpen(false)}>
            상담 신청
          </MobileNavLink>
          <MobileNavLink href="/chat" onClick={() => setIsMobileMenuOpen(false)}>
            AI 상담
          </MobileNavLink>
          <MobileNavLink href="/faq" onClick={() => setIsMobileMenuOpen(false)}>
            FAQ & 정보
          </MobileNavLink>
        </MobileNavLinks>
        
        <AuthButtons>
          <Button size="small" variant="secondary" fullWidth>로그인</Button>
          <Button size="small" fullWidth>회원가입</Button>
        </AuthButtons>
      </MobileMenu>
    </HeaderContainer>
  );
}