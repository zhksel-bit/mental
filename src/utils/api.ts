/**
 * API 호출을 위한 기본 URL
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * HTTP 요청을 보내는 함수
 * @param endpoint API 엔드포인트
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
}

/**
 * GET 요청을 보내는 함수
 * @param endpoint API 엔드포인트
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export async function get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return request<T>(endpoint, {
    method: 'GET',
    ...options,
  });
}

/**
 * POST 요청을 보내는 함수
 * @param endpoint API 엔드포인트
 * @param data 요청 본문 데이터
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export async function post<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
  return request<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * PUT 요청을 보내는 함수
 * @param endpoint API 엔드포인트
 * @param data 요청 본문 데이터
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export async function put<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
  return request<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * DELETE 요청을 보내는 함수
 * @param endpoint API 엔드포인트
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export async function del<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return request<T>(endpoint, {
    method: 'DELETE',
    ...options,
  });
}

/**
 * 상담 신청을 위한 함수
 * @param consultationData 상담 데이터
 * @returns 생성된 상담 정보
 */
export async function createConsultation(consultationData: {
  title: string;
  content: string;
  anonymous: boolean;
}): Promise<any> {
  return post('/consultations', consultationData);
}

/**
 * 상담 목록을 가져오는 함수
 * @returns 상담 목록
 */
export async function getConsultations(): Promise<any[]> {
  return get('/consultations');
}

/**
 * 특정 상담을 가져오는 함수
 * @param id 상담 ID
 * @returns 상담 정보
 */
export async function getConsultation(id: string): Promise<any> {
  return get(`/consultations/${id}`);
}

/**
 * 상담 상태를 업데이트하는 함수
 * @param id 상담 ID
 * @param status 새로운 상태
 * @returns 업데이트된 상담 정보
 */
export async function updateConsultationStatus(id: string, status: string): Promise<any> {
  return put(`/consultations/${id}/status`, { status });
}

/**
 * 답변을 추가하는 함수
 * @param consultationId 상담 ID
 * @param content 답변 내용
 * @returns 생성된 답변 정보
 */
export async function createResponse(consultationId: string, content: string): Promise<any> {
  return post('/responses', { consultationId, content });
}

/**
 * FAQ 목록을 가져오는 함수
 * @returns FAQ 목록
 */
export async function getFAQs(): Promise<any[]> {
  return get('/faqs');
}

/**
 * 정보 게시글 목록을 가져오는 함수
 * @returns 정보 게시글 목록
 */
export async function getArticles(): Promise<any[]> {
  return get('/articles');
}

/**
 * 챗봇 메시지를 보내는 함수
 * @param message 사용자 메시지
 * @returns 챗봇 응답
 */
export async function sendChatMessage(message: string): Promise<string> {
  const response = await post<{ reply: string }>('/chat', { message });
  return response.reply;
}