import { apiClient } from "../../../api/client";
import {
  Candidate,
  CandidateQuery,
  CreateCandidateRequest,
  UpdateCandidateRequest,
  CandidateListResponse,
} from "../../../shared/types/candidate";

export const candidateService = {
  // Get all candidates with optional filtering
  async getCandidates(query?: CandidateQuery): Promise<CandidateListResponse> {
    const params = new URLSearchParams();

    if (query?.search) params.append("search", query.search);
    if (query?.skills?.length) params.append("skills", query.skills.join(","));
    if (query?.minExperience !== undefined)
      params.append("minExperience", query.minExperience.toString());
    if (query?.maxExperience !== undefined)
      params.append("maxExperience", query.maxExperience.toString());
    if (query?.status) params.append("status", query.status);
    if (query?.location) params.append("location", query.location);
    if (query?.page !== undefined) params.append("page", query.page.toString());
    if (query?.limit !== undefined)
      params.append("limit", query.limit.toString());

    return apiClient.get<CandidateListResponse>(
      `/candidates?${params.toString()}`
    );
  },

  // Get single candidate by ID
  async getCandidate(id: string): Promise<Candidate> {
    return apiClient.get<Candidate>(`/candidates/${id}`);
  },

  // Create new candidate
  async createCandidate(data: CreateCandidateRequest): Promise<Candidate> {
    return apiClient.post<Candidate>("/candidates", data);
  },

  // Update existing candidate
  async updateCandidate(
    id: string,
    data: UpdateCandidateRequest
  ): Promise<Candidate> {
    return apiClient.put<Candidate>(`/candidates/${id}`, data);
  },

  // Delete candidate
  async deleteCandidate(id: string): Promise<void> {
    return apiClient.delete<void>(`/candidates/${id}`);
  },

  // Activate candidate
  async activateCandidate(id: string): Promise<Candidate> {
    return apiClient.patch<Candidate>(`/candidates/${id}/activate`);
  },

  // Deactivate candidate
  async deactivateCandidate(id: string): Promise<Candidate> {
    return apiClient.patch<Candidate>(`/candidates/${id}/deactivate`);
  },
};
