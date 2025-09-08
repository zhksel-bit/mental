/**
 * 404 에러 처리 미들웨어
 * @param {object} req 요청 객체
 * @param {object} res 응답 객체
 * @param {function} next 다음 미들웨어 함수
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({ 
    success: false, 
    message: '요청하신 리소스를 찾을 수 없습니다.' 
  });
}

/**
 * 일반적인 에러 처리 미들웨어
 * @param {object} err 에러 객체
 * @param {object} req 요청 객체
 * @param {object} res 응답 객체
 * @param {function} next 다음 미들웨어 함수
 */
function errorHandler(err, req, res, next) {
  // Mongoose 유효성 에러 처리
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ 
      success: false, 
      message: '입력 데이터가 유효하지 않습니다.', 
      errors 
    });
  }
  
  // Mongoose 중복 키 에러 처리
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({ 
      success: false, 
      message: `${field}이(가) 이미 존재합니다.` 
    });
  }
  
  // 사용자 정의 에러 처리
  if (err.statusCode) {
    return res.status(err.statusCode).json({ 
      success: false, 
      message: err.message 
    });
  }
  
  // 기타 서버 에러
  console.error('서버 에러:', err);
  res.status(500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : '서버 내부 오류가 발생했습니다.' 
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};