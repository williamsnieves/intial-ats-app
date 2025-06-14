import { z } from "zod";

// Request DTOs
export const CreateCandidateDto = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name too long"),
  phone: z.string().optional(),
  resumeUrl: z.string().url("Invalid URL").optional(),
  linkedinUrl: z.string().url("Invalid URL").optional(),
  skills: z.array(z.string()).default([]),
  experience: z.number().int().min(0, "Experience cannot be negative"),
  location: z.string().optional(),
  salary: z.number().int().min(0, "Salary cannot be negative").optional(),
});

export const UpdateCandidateDto = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  phone: z.string().optional(),
  resumeUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.number().int().min(0).optional(),
  location: z.string().optional(),
  salary: z.number().int().min(0).optional(),
});

// Response DTOs
export interface CandidateResponseDto {
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

export interface CandidateListResponseDto {
  candidates: CandidateResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Query DTOs
export const CandidateQueryDto = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  skills: z.array(z.string()).optional(),
  minExperience: z.number().int().min(0).optional(),
  maxExperience: z.number().int().min(0).optional(),
  location: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "BLACKLISTED"]).optional(),
});

// Type exports
export type CreateCandidateRequest = z.infer<typeof CreateCandidateDto>;
export type UpdateCandidateRequest = z.infer<typeof UpdateCandidateDto>;
export type CandidateQuery = z.infer<typeof CandidateQueryDto>;
