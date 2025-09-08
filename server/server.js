const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 환경 변수 로드
dotenv.config();

// 앱 초기화
const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 연결 (로컬 테스트를 위해 주석 처리)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/psychology_consultation')
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch(err => console.error('MongoDB 연결 오류:', err));


// 라우트
app.get('/', (req, res) => {
  res.json({ message: '심리 상담 API 서버가 실행 중입니다.' });
});

// 상담 관련 라우트
app.use('/api/consultations', require('./routes/consultations'));

// 답변 관련 라우트
app.use('/api/responses', require('./routes/responses'));

// FAQ 관련 라우트
app.use('/api/faqs', require('./routes/faqs'));

// 정보 게시판 관련 라우트
app.use('/api/articles', require('./routes/articles'));

// 챗봇 관련 라우트
app.use('/api/chat', require('./routes/chat'));

// 인증 관련 라우트
app.use('/api/auth', require('./routes/auth'));

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: '서버 내부 오류가 발생했습니다.', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

// 404 처리 미들웨어
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: '요청하신 리소스를 찾을 수 없습니다.' 
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

module.exports = app;