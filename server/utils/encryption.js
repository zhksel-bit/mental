const crypto = require('crypto');

// 환경 변수에서 암호화 키 가져오기
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default_encryption_key_32bytes!';
const IV_LENGTH = 16; // AES 암호화를 위한 초기화 벡터 길이

/**
 * 텍스트를 AES-256-CBC로 암호화
 * @param {string} text 암호화할 텍스트
 * @returns {string} 암호화된 텍스트 (iv:encryptedData 형식)
 */
function encrypt(text) {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('암호화 오류:', error);
    throw new Error('데이터 암호화에 실패했습니다.');
  }
}

/**
 * AES-256-CBC로 암호화된 텍스트를 복호화
 * @param {string} text 복호화할 텍스트 (iv:encryptedData 형식)
 * @returns {string} 복호화된 텍스트
 */
function decrypt(text) {
  try {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error('복호화 오류:', error);
    throw new Error('데이터 복호화에 실패했습니다.');
  }
}

/**
 * JWT 토큰 생성
 * @param {object} payload 토큰에 포함할 데이터
 * @param {string} secret 토큰 서명을 위한 비밀키
 * @param {string|number} expiresIn 만료 시간 (예: '1h', '7d', 3600 등)
 * @returns {string} JWT 토큰
 */
function generateToken(payload, secret, expiresIn) {
  const jwt = require('jsonwebtoken');
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * JWT 토큰 검증
 * @param {string} token 검증할 토큰
 * @param {string} secret 토큰 서명을 위한 비밀키
 * @returns {object} 디코딩된 토큰 데이터
 */
function verifyToken(token, secret) {
  const jwt = require('jsonwebtoken');
  return jwt.verify(token, secret);
}

module.exports = {
  encrypt,
  decrypt,
  generateToken,
  verifyToken
};