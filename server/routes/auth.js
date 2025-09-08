const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { encrypt, generateToken, verifyToken } = require('../utils/encryption');
const { validateEmail, validatePassword } = require('../utils/validation');
const { authenticateToken } = require('../middleware/auth');

/**
 * 임시 코드 발급 (익명 사용자용)
 * POST /api/auth/temp-code
 */
router.post('/temp-code', async (req, res) => {
  try {
    // 임시 코드 생성
    let temporaryCode;
    let isUnique = false;
    
    // 고유한 코드 생성
    while (!isUnique) {
      temporaryCode = User.generateTemporaryCode();
      const existingUser = await User.findOne({ temporaryCode });
      if (!existingUser) {
        isUnique = true;
      }
    }
    
    // 코드 만료 시간 설정 (1시간)
    const codeExpiry = new Date(Date.now() + 60 * 60 * 1000);
    
    // 사용자 생성 또는 업데이트
    const user = new User({
      temporaryCode,
      codeExpiry
    });
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: '임시 코드가 발급되었습니다.', 
      data: { 
        temporaryCode,
        expiry: codeExpiry
      } 
    });
  } catch (error) {
    console.error('임시 코드 발급 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '임시 코드 발급 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 이메일 인증 (옵션)
 * POST /api/auth/email-verify
 */
router.post('/email-verify', async (req, res) => {
  try {
    const { email } = req.body;
    
    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: '유효한 이메일 주소를 입력해주세요.' 
      });
    }
    
    // 사용자 생성 또는 찾기
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
    }
    
    await user.save();
    
    // 실제 이메일 발송 로직은 여기에 구현 (생략)
    
    res.json({ 
      success: true, 
      message: '이메일 인증 코드가 발송되었습니다.' 
    });
  } catch (error) {
    console.error('이메일 인증 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '이메일 인증 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 관리자 로그인
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 입력값 검사
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: '이메일과 비밀번호를 모두 입력해주세요.' 
      });
    }
    
    // 사용자 찾기
    const user = await User.findOne({ email });
    if (!user || !user.isAdmin) {
      return res.status(401).json({ 
        success: false, 
        message: '이메일 또는 비밀번호가 잘못되었습니다.' 
      });
    }
    
    // 비밀번호 확인
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: '이메일 또는 비밀번호가 잘못되었습니다.' 
      });
    }
    
    // JWT 토큰 생성
    const token = generateToken(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'your_jwt_secret',
      '7d' // 7일간 유효
    );
    
    res.json({ 
      success: true, 
      message: '로그인에 성공했습니다.', 
      data: { 
        token,
        user: {
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin
        }
      } 
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '로그인 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 로그아웃
 * POST /api/auth/logout
 */
router.post('/logout', authenticateToken, (req, res) => {
  // 클라이언트 측에서 토큰을 삭제하도록 지시
  res.json({ 
    success: true, 
    message: '로그아웃되었습니다.' 
  });
});

/**
 * 현재 사용자 정보 조회
 * GET /api/auth/me
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: '사용자를 찾을 수 없습니다.' 
      });
    }
    
    res.json({ 
      success: true, 
      data: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        hasTemporaryCode: !!user.temporaryCode
      }
    });
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '사용자 정보 조회 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;