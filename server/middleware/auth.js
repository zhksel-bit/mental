const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../utils/encryption');

/**
 * JWT 토큰을 검증하는 미들웨어
 * @param {object} req 요청 객체
 * @param {object} res 응답 객체
 * @param {function} next 다음 미들웨어 함수
 */
async function authenticateToken(req, res, next) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN 형식
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: '액세스 토큰이 필요합니다.' 
      });
    }
    
    // 토큰 검증
    const decoded = verifyToken(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: '토큰이 만료되었습니다.' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        success: false, 
        message: '유효하지 않은 토큰입니다.' 
      });
    }
    
    console.error('토큰 검증 오류:', error);
    return res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
}

/**
 * 관리자 권한을 검증하는 미들웨어
 * @param {object} req 요청 객체
 * @param {object} res 응답 객체
 * @param {function} next 다음 미들웨어 함수
 */
async function authorizeAdmin(req, res, next) {
  try {
    // 먼저 토큰 검증
    await authenticateToken(req, res, () => {});
    
    // 사용자 정보 조회
    const user = await User.findById(req.user.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: '관리자 권한이 필요합니다.' 
      });
    }
    
    req.admin = user;
    next();
  } catch (error) {
    console.error('관리자 권한 검증 오류:', error);
    return res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
}

module.exports = {
  authenticateToken,
  authorizeAdmin
};