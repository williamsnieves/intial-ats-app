export interface Candidate {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  skills: string[];
  experience: number;
  location?: string;
  salary?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export enum CandidateStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  HIRED = "HIRED",
  REJECTED = "REJECTED",
  BLACKLISTED = "BLACKLISTED",
}

export interface CreateCandidateRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  skills: string[];
  experience: number;
  location?: string;
  salary?: number;
}

export interface UpdateCandidateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  skills?: string[];
  experience?: number;
  location?: string;
  salary?: number;
}

export interface CandidateListResponse {
  candidates: Candidate[];
  total: number;
  page: number;
  limit: number;
}

export interface CandidateQuery {
  page?: number;
  limit?: number;
  search?: string;
  skills?: string[];
  minExperience?: number;
  maxExperience?: number;
  location?: string;
  status?: CandidateStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
