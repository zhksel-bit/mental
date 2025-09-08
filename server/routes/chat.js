const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const ChatSession = require('../models/ChatSession');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 챗봇 메시지 전송
 * POST /api/chat
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: '메시지를 입력해주세요.' 
      });
    }
    
    // 사용자 정보 확인
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: '사용자를 찾을 수 없습니다.' 
      });
    }
    
    // 챗봇 세션 찾기 또는 생성
    let chatSession = await ChatSession.findOne({ userId: req.user.userId });
    if (!chatSession) {
      chatSession = new ChatSession({
        userId: req.user.userId,
        messages: []
      });
    }
    
    // 사용자 메시지 추가
    chatSession.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });
    
    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "당신은 심리 상담을 도와주는 공감능력이 뛰어난 챗봇입니다. 사용자의 감정을 이해하고 공감하며, 필요시 전문 상담 연결을 안내해주세요. 답변은 200자 이내로 간결하게 제공해주세요."
        },
        ...chatSession.messages.slice(-10) // 최근 10개 메시지만 전송
      ],
      max_tokens: 150,
      temperature: 0.7
    });
    
    const botReply = completion.choices[0].message.content;
    
    // 챗봇 응답 추가
    chatSession.messages.push({
      role: 'assistant',
      content: botReply,
      timestamp: new Date()
    });
    
    // 세션 저장
    await chatSession.save();
    
    res.json({ 
      success: true, 
      data: { reply: botReply } 
    });
  } catch (error) {
    console.error('챗봇 메시지 처리 오류:', error);
    
    // OpenAI API 오류 처리
    if (error instanceof OpenAI.APIError) {
      return res.status(500).json({ 
        success: false, 
        message: '챗봇 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: '메시지 처리 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 채팅 세션 목록 조회
 * GET /api/chat/sessions
 */
router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    // 관리자 권한 확인
    const user = await User.findById(req.user.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: '관리자 권한이 필요합니다.' 
      });
    }
    
    const sessions = await ChatSession.find()
      .populate('userId', 'email isAdmin')
      .sort({ updatedAt: -1 });
    
    res.json({ 
      success: true, 
      data: sessions 
    });
  } catch (error) {
    console.error('채팅 세션 목록 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '채팅 세션 목록 조회 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 특정 채팅 세션 조회
 * GET /api/chat/sessions/:id
 */
router.get('/sessions/:id', authenticateToken, async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.id)
      .populate('userId', 'email isAdmin');
    
    if (!session) {
      return res.status(404).json({ 
        success: false, 
        message: '채팅 세션을 찾을 수 없습니다.' 
      });
    }
    
    // 관리자이거나 세션 소유자만 접근 가능
    if (!req.user.isAdmin && session.userId.toString() !== req.user.userId) {
      return res.status(403).json({ 
        success: false, 
        message: '이 채팅 세션에 접근할 권한이 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      data: session 
    });
  } catch (error) {
    console.error('채팅 세션 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '채팅 세션 조회 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;