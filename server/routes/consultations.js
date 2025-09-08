const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const User = require('../models/User');
const { encrypt } = require('../utils/encryption');
const { validateConsultationTitle, validateConsultationContent } = require('../utils/validation');
const { authenticateToken } = require('../middleware/auth');

/**
 * 상담 신청
 * POST /api/consultations
 */
router.post('/', async (req, res) => {
  try {
    const { title, content, anonymous } = req.body;
    
    // 유효성 검사
    if (!validateConsultationTitle(title)) {
      return res.status(400).json({ 
        success: false, 
        message: '상담 제목은 5-100자 사이여야 합니다.' 
      });
    }
    
    if (!validateConsultationContent(content)) {
      return res.status(400).json({ 
        success: false, 
        message: '상담 내용은 10-2000자 사이여야 합니다.' 
      });
    }
    
    // 익명이 아닌 경우 사용자 정보 확인
    let userId = null;
    if (!anonymous && req.user) {
      userId = req.user.userId;
    }
    
    // 데이터 암호화
    const encryptedTitle = encrypt(title);
    const encryptedContent = encrypt(content);
    
    // 상담 생성
    const consultation = new Consultation({
      userId,
      title,
      content,
      encryptedTitle,
      encryptedContent
    });
    
    await consultation.save();
    
    res.status(201).json({ 
      success: true, 
      message: '상담이 성공적으로 신청되었습니다.', 
      data: { id: consultation._id } 
    });
  } catch (error) {
    console.error('상담 신청 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '상담 신청 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 사용자별 상담 목록 조회
 * GET /api/consultations
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const consultations = await Consultation.find({ userId: req.user.userId })
      .select('-encryptedTitle -encryptedContent')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      data: consultations 
    });
  } catch (error) {
    console.error('상담 목록 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '상담 목록 조회 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 특정 상담 조회
 * GET /api/consultations/:id
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    
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
    
    res.json({ 
      success: true, 
      data: consultation 
    });
  } catch (error) {
    console.error('상담 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '상담 조회 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 상담 상태 업데이트 (관리자용)
 * PUT /api/consultations/:id/status
 */
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    
    // 관리자 권한 확인
    const user = await User.findById(req.user.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: '관리자 권한이 필요합니다.' 
      });
    }
    
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!consultation) {
      return res.status(404).json({ 
        success: false, 
        message: '상담을 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      message: '상담 상태가 업데이트되었습니다.', 
      data: consultation 
    });
  } catch (error) {
    console.error('상담 상태 업데이트 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '상담 상태 업데이트 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;