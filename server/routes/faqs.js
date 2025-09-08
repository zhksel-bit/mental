const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateTextField } = require('../utils/validation');

/**
 * FAQ 목록 조회
 * GET /api/faqs
 */
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      data: faqs 
    });
  } catch (error) {
    console.error('FAQ 목록 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: 'FAQ 목록 조회 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * FAQ 추가 (관리자용)
 * POST /api/faqs
 */
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    
    // 유효성 검사
    if (!validateTextField(question, 1, 300)) {
      return res.status(400).json({ 
        success: false, 
        message: '질문은 1-300자 사이여야 합니다.' 
      });
    }
    
    if (!validateTextField(answer, 1, 2000)) {
      return res.status(400).json({ 
        success: false, 
        message: '답변은 1-2000자 사이여야 합니다.' 
      });
    }
    
    if (!validateTextField(category, 1, 50)) {
      return res.status(400).json({ 
        success: false, 
        message: '카테고리는 1-50자 사이여야 합니다.' 
      });
    }
    
    // FAQ 생성
    const faq = new FAQ({
      question,
      answer,
      category
    });
    
    await faq.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'FAQ가 성공적으로 추가되었습니다.', 
      data: faq 
    });
  } catch (error) {
    console.error('FAQ 추가 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: 'FAQ 추가 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * FAQ 수정 (관리자용)
 * PUT /api/faqs/:id
 */
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    
    // 유효성 검사
    if (question && !validateTextField(question, 1, 300)) {
      return res.status(400).json({ 
        success: false, 
        message: '질문은 1-300자 사이여야 합니다.' 
      });
    }
    
    if (answer && !validateTextField(answer, 1, 2000)) {
      return res.status(400).json({ 
        success: false, 
        message: '답변은 1-2000자 사이여야 합니다.' 
      });
    }
    
    if (category && !validateTextField(category, 1, 50)) {
      return res.status(400).json({ 
        success: false, 
        message: '카테고리는 1-50자 사이여야 합니다.' 
      });
    }
    
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer, category },
      { new: true }
    );
    
    if (!faq) {
      return res.status(404).json({ 
        success: false, 
        message: 'FAQ를 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'FAQ가 성공적으로 수정되었습니다.', 
      data: faq 
    });
  } catch (error) {
    console.error('FAQ 수정 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: 'FAQ 수정 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * FAQ 삭제 (관리자용)
 * DELETE /api/faqs/:id
 */
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    
    if (!faq) {
      return res.status(404).json({ 
        success: false, 
        message: 'FAQ를 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'FAQ가 성공적으로 삭제되었습니다.' 
    });
  } catch (error) {
    console.error('FAQ 삭제 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: 'FAQ 삭제 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;
