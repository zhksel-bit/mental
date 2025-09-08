const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Consultation = require('../models/Consultation');
const User = require('../models/User');
const { encrypt } = require('../utils/encryption');
const { authenticateToken } = require('../middleware/auth');

/**
 * 답변 추가 (관리자용)
 * POST /api/responses
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { consultationId, content } = req.body;
    
    // 관리자 권한 확인
    const user = await User.findById(req.user.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: '관리자 권한이 필요합니다.' 
      });
    }
    
    // 상담 존재 여부 확인
    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      return res.status(404).json({ 
        success: false, 
        message: '상담을 찾을 수 없습니다.' 
      });
    }
    
    // 데이터 암호화
    const encryptedContent = encrypt(content);
    
    // 답변 생성
    const response = new Response({
      consultationId,
      counselorId: req.user.userId,
      content,
      encryptedContent
    });
    
    await response.save();
    
    // 상담 상태 업데이트
    consultation.status = 'completed';
    await consultation.save();
    
    res.status(201).json({ 
      success: true, 
      message: '답변이 성공적으로 추가되었습니다.', 
      data: response 
    });
  } catch (error) {
    console.error('답변 추가 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '답변 추가 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 특정 상담의 답변 조회
 * GET /api/responses/:consultationId
 */
router.get('/:consultationId', authenticateToken, async (req, res) => {
  try {
    // 상담 존재 여부 및 사용자 권한 확인
    const consultation = await Consultation.findById(req.params.consultationId);
    if (!consultation) {
      return res.status(404).json({ 
        success: false, 
        message: '상담을 찾을 수 없습니다.' 
      });
    }
    
    // 사용자 권한 확인
    if (consultation.userId && consultation.userId.toString() !== req.user.userId) {
      return res.status(403).json({ 
        success: false, 
        message: '이 상담에 접근할 권한이 없습니다.' 
      });
    }
    
    const response = await Response.findOne({ consultationId: req.params.consultationId });
    
    if (!response) {
      return res.status(404).json({ 
        success: false, 
        message: '답변을 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      data: response 
    });
  } catch (error) {
    console.error('답변 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '답변 조회 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 답변 수정 (관리자용)
 * PUT /api/responses/:id
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    
    // 관리자 권한 확인
    const user = await User.findById(req.user.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: '관리자 권한이 필요합니다.' 
      });
    }
    
    // 데이터 암호화
    const encryptedContent = encrypt(content);
    
    const response = await Response.findByIdAndUpdate(
      req.params.id,
      { content, encryptedContent },
      { new: true }
    );
    
    if (!response) {
      return res.status(404).json({ 
        success: false, 
        message: '답변을 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      message: '답변이 성공적으로 수정되었습니다.', 
      data: response 
    });
  } catch (error) {
    console.error('답변 수정 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '답변 수정 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;