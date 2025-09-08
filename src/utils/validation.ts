/**
 * 이메일 형식을 검증하는 함수
 * @param email 검증할 이메일 주소
 * @returns 유효한 이메일이면 true, 그렇지 않으면 false
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 강도를 검증하는 함수
 * @param password 검증할 비밀번호
 * @returns 강도 검증 결과 객체
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
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
 * 전화번호 형식을 검증하는 함수
 * @param phone 검증할 전화번호
 * @returns 유효한 전화번호이면 true, 그렇지 않으면 false
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * 이름 형식을 검증하는 함수 (한글, 영문만 허용)
 * @param name 검증할 이름
 * @returns 유효한 이름이면 true, 그렇지 않으면 false
 */
export function validateName(name: string): boolean {
  const nameRegex = /^[가-힣a-zA-Z\s]+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 20;
}

/**
 * 상담 제목 형식을 검증하는 함수
 * @param title 검증할 제목
 * @returns 유효한 제목이면 true, 그렇지 않으면 false
 */
export function validateConsultationTitle(title: string): boolean {
  return title.length >= 5 && title.length <= 100;
}

/**
 * 상담 내용 형식을 검증하는 함수
 * @param content 검증할 내용
 * @returns 유효한 내용이면 true, 그렇지 않으면 false
 */
export function validateConsultationContent(content: string): boolean {
  return content.length >= 10 && content.length <= 2000;
}

/**
 * 일반적인 텍스트 필드 유효성 검사 함수
 * @param value 검증할 값
 * @param minLength 최소 길이
 * @param maxLength 최대 길이
 * @param allowEmpty 빈 값 허용 여부
 * @returns 유효하면 true, 그렇지 않으면 false
 */
export function validateTextField(
  value: string,
  minLength: number = 1,
  maxLength: number = 100,
  allowEmpty: boolean = false
): boolean {
  if (allowEmpty && value.length === 0) {
    return true;
  }
  
  return value.length >= minLength && value.length <= maxLength;
}