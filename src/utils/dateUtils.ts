/**
 * 날짜를 포맷팅하는 함수
 * @param date Date 객체 또는 ISO 문자열
 * @param format 포맷 문자열 (예: 'YYYY-MM-DD', 'MM/DD HH:mm')
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
}

/**
 * 상대적 시간을 계산하는 함수 (예: "5분 전", "2시간 전")
 * @param date Date 객체 또는 ISO 문자열
 * @returns 상대적 시간 문자열
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval}년 전`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval}개월 전`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval}일 전`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval}시간 전`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval}분 전`;
  }
  
  return "방금 전";
}

/**
 * 두 날짜 사이의 차이를 계산하는 함수
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜 (기본값: 현재)
 * @returns 차이 정보 객체
 */
export function dateDifference(startDate: Date | string, endDate: Date | string = new Date()): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();
  
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  
  if (hours < 0) {
    hours += 24;
    days--;
  }
  
  if (days < 0) {
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  
  if (months < 0) {
    months += 12;
    years--;
  }
  
  return { years, months, days, hours, minutes, seconds };
}