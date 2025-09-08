"use client";

import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #e0f7fa 0%, #bbdefb 100%);
  min-height: 100vh;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4fc3f7;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4fc3f7;
    outline: none;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(45deg, #29b6f6, #0288d1);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const InfoBox = styled.div`
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 0 8px 8px 0;
`;

export default function ConsultationForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 상담 신청 로직 구현
    try {
      // 여기에 API 호출 로직 추가
      console.log('상담 신청:', { title, content, anonymous });
      
      // 잠시 대기 후 성공 메시지 표시
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('상담 신청이 완료되었습니다. 곧 상담사가 답변을 드릴 예정입니다.');
      // 폼 초기화
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('상담 신청 오류:', error);
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>상담 신청</Title>
        <Description>
          아래 양식을 작성하여 상담을 신청해주세요. 
          모든 상담은 익명으로 처리되며, 개인정보는 안전하게 보호됩니다.
        </Description>
        
        <InfoBox>
          <strong>안내:</strong> 상담 내용은 전문 상담사에게 전달되며, 
          1-2 영업일 내에 답변을 받으실 수 있습니다.
        </InfoBox>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">상담 제목</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="예: 대인관계에서 스트레스를 느껴요"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="content">상담 내용</Label>
            <TextArea
              id="content"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              placeholder="상담받고 싶은 내용을 자세히 입력해주세요..."
              required
            />
          </FormGroup>
          
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={anonymous}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnonymous(e.target.checked)}
              />
              익명으로 상담하기
            </CheckboxLabel>
          </CheckboxGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '신청 중...' : '상담 신청하기'}
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
}