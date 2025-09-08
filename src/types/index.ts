/**
 * 사용자 타입
 */
export interface User {
  id: string;
  email?: string;
  temporaryCode?: string;
  codeExpiry?: Date;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 상담 타입
 */
export interface Consultation {
  id: string;
  userId?: string;
  title: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 상담사 답변 타입
 */
export interface Response {
  id: string;
  consultationId: string;
  counselorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * FAQ 타입
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 정보 게시글 타입
 */
export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 챗봇 세션 타입
 */
export interface ChatSession {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 챗봇 메시지 타입
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * 인증 관련 타입
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

/**
 * API 응답 타입
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

/**
 * 페이지네이션 타입
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}