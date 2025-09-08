const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { validateTextField } = require('../utils/validation');

/**
 * 정보 게시글 목록 조회
 * GET /api/articles
 */
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      data: articles 
    });
  } catch (error) {
    console.error('정보 게시글 목록 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '정보 게시글 목록 조회 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 정보 게시글 추가 (관리자용)
 * POST /api/articles
 */
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, content, author, category } = req.body;
    
    // 유효성 검사
    if (!validateTextField(title, 1, 200)) {
      return res.status(400).json({ 
        success: false, 
        message: '제목은 1-200자 사이여야 합니다.' 
      });
    }
    
    if (!validateTextField(content, 1, 10000)) {
      return res.status(400).json({ 
        success: false, 
        message: '내용은 1-10000자 사이여야 합니다.' 
      });
    }
    
    if (!validateTextField(author, 1, 100)) {
      return res.status(400).json({ 
        success: false, 
        message: '작성자는 1-100자 사이여야 합니다.' 
      });
    }
    
    if (!validateTextField(category, 1, 50)) {
      return res.status(400).json({ 
        success: false, 
        message: '카테고리는 1-50자 사이여야 합니다.' 
      });
    }
    
    // 정보 게시글 생성
    const article = new Article({
      title,
      content,
      author,
      category
    });
    
    await article.save();
    
    res.status(201).json({ 
      success: true, 
      message: '정보 게시글이 성공적으로 추가되었습니다.', 
      data: article 
    });
  } catch (error) {
    console.error('정보 게시글 추가 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '정보 게시글 추가 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 특정 정보 게시글 조회
 * GET /api/articles/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ 
        success: false, 
        message: '정보 게시글을 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      data: article 
    });
  } catch (error) {
    console.error('정보 게시글 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '정보 게시글 조회 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 정보 게시글 수정 (관리자용)
 * PUT /api/articles/:id
 */
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, content, author, category } = req.body;
    
    // 유효성 검사
    if (title && !validateTextField(title, 1, 200)) {
      return res.status(400).json({ 
        success: false, 
        message: '제목은 1-200자 사이여야 합니다.' 
      });
    }
    
    if (content && !validateTextField(content, 1, 10000)) {
      return res.status(400).json({ 
        success: false, 
        message: '내용은 1-10000자 사이여야 합니다.' 
      });
    }
    
    if (author && !validateTextField(author, 1, 100)) {
      return res.status(400).json({ 
        success: false, 
        message: '작성자는 1-100자 사이여야 합니다.' 
      });
    }
    
    if (category && !validateTextField(category, 1, 50)) {
      return res.status(400).json({ 
        success: false, 
        message: '카테고리는 1-50자 사이여야 합니다.' 
      });
    }
    
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, author, category },
      { new: true }
    );
    
    if (!article) {
      return res.status(404).json({ 
        success: false, 
        message: '정보 게시글을 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      message: '정보 게시글이 성공적으로 수정되었습니다.', 
      data: article 
    });
  } catch (error) {
    console.error('정보 게시글 수정 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '정보 게시글 수정 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 정보 게시글 삭제 (관리자용)
 * DELETE /api/articles/:id
 */
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({ 
        success: false, 
        message: '정보 게시글을 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      message: '정보 게시글이 성공적으로 삭제되었습니다.' 
    });
  } catch (error) {
    console.error('정보 게시글 삭제 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '정보 게시글 삭제 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;