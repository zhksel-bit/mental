/**
 * 이메일 형식을 검증하는 함수
 * @param {string} email 검증할 이메일 주소
 * @returns {boolean} 유효한 이메일이면 true, 그렇지 않으면 false
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 강도를 검증하는 함수
 * @param {string} password 검증할 비밀번호
 * @returns {object} 강도 검증 결과 객체
 */
function validatePassword(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('비밀번호에는 최소한 하나의 대문자가 포함되어야 합니다.');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('비밀번호에는 최소한 하나의 소문자가 포함되어야 합니다.');
  }
  
  if (!/\d/.test(password)) {
    errors.push('비밀번호에는 최소한 하나의 숫자가 포함되어야 합니다.');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('비밀번호에는 최소한 하나의 특수문자가 포함되어야 합니다.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 상담 제목 형식을 검증하는 함수
 * @param {string} title 검증할 제목
 * @returns {boolean} 유효한 제목이면 true, 그렇지 않으면 false
 */
function validateConsultationTitle(title) {
  return title.length >= 5 && title.length <= 100;
}

/**
 * 상담 내용 형식을 검증하는 함수
 * @param {string} content 검증할 내용
 * @returns {boolean} 유효한 내용이면 true, 그렇지 않으면 false
 */
function validateConsultationContent(content) {
  return content.length >= 10 && content.length <= 2000;
}

/**
 * 일반적인 텍스트 필드 유효성 검사 함수
 * @param {string} value 검증할 값
 * @param {number} minLength 최소 길이
 * @param {number} maxLength 최대 길이
 * @param {boolean} allowEmpty 빈 값 허용 여부
 * @returns {boolean} 유효하면 true, 그렇지 않으면 false
 */
function validateTextField(value, minLength = 1, maxLength = 100, allowEmpty = false) {
  if (allowEmpty && value.length === 0) {
    return true;
  }
  
  return value.length >= minLength && value.length <= maxLength;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateConsultationTitle,
  validateConsultationContent,
  validateTextField
};