"use client";

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Message = styled.div<{ isUser?: boolean }>`
  display: flex;
  justify-content: ${(props: { isUser?: boolean }) => props.isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 15px;
`;

const MessageBubble = styled.div<{ isUser?: boolean }>`
  max-width: 70%;
  padding: 15px;
  border-radius: 15px;
  background: ${(props: { isUser?: boolean }) => props.isUser ? '#007bff' : '#e9ecef'};
  color: ${(props: { isUser?: boolean }) => props.isUser ? 'white' : '#333'};
  word-wrap: break-word;
`;

const InputArea = styled.div`
  display: flex;
  gap: 10px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  padding: 15px 25px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const InfoBox = styled.div`
  background: #d1ecf1;
  border-left: 4px solid #0c5460;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 0 8px 8px 0;
  color: #0c5460;
`;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 저는 마음챙김 상담 챗봇입니다. 어떤 고민이 있으신가요?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  // 스크롤을 항상 하단으로 유지
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 여기에 실제 챗봇 API 호출 로직을 구현합니다
      // 현재는 시뮬레이션으로 대체합니다
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getBotResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('챗봇 응답 오류:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '죄송합니다. 현재 챗봇 응답에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = (userInput: string): string => {
    // 간단한 응답 로직 - 실제 구현에서는 AI API를 사용해야 합니다
    const responses = [
      "그렇군요. 그런 감정을 느끼시는 것이 이해됩니다. 좀 더 자세히 이야기해주실 수 있나요?",
      "말씀해주셔서 감사합니다. 당신의 감정은 충분히 중요하고 가치 있는 것입니다.",
      "힘드시겠어요. 이런 상황에서 스스로를 돌보는 방법을 함께 생각해볼까요?",
      "당신의 이야기를 들으니 당신이 얼마나 노력하고 있는지 알 것 같아요.",
      "걱정이 많으시겠네요. 함께 해결 방법을 찾아보는 것은 어떨까요?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageContainer>
      <ChatContainer>
        <Title>AI 상담 챗봇</Title>
        
        <InfoBox>
          <strong>안내:</strong> 이 챗봇은 간단한 공감과 위로를 제공합니다. 
          심각한 고민이나 위기 상황의 경우 전문 상담을 신청해주세요.
        </InfoBox>
        
        <ChatHistory ref={chatHistoryRef}>
          {messages.map((message) => (
            <Message key={message.id} isUser={message.role === 'user'}>
              <MessageBubble isUser={message.role === 'user'}>
                {message.content}
              </MessageBubble>
            </Message>
          ))}
          {isLoading && (
            <Message isUser={false}>
              <MessageBubble isUser={false}>
                ...
              </MessageBubble>
            </Message>
          )}
        </ChatHistory>
        
        <InputArea>
          <MessageInput
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="고민을 입력해주세요..."
            disabled={isLoading}
          />
          <SendButton onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
            전송
          </SendButton>
        </InputArea>
      </ChatContainer>
    </PageContainer>
  );
}