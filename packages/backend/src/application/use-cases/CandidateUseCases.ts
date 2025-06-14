import { Candidate, CandidateStatus } from "../../domain/entities/Candidate";
import { CandidateRepository } from "../../domain/repositories/CandidateRepository";
import {
  CreateCandidateRequest,
  UpdateCandidateRequest,
  CandidateResponseDto,
  CandidateListResponseDto,
  CandidateQuery,
} from "../dtos/CandidateDto";

export class CandidateUseCases {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async createCandidate(
    data: CreateCandidateRequest
  ): Promise<CandidateResponseDto> {
    // Check if candidate already exists
    const existingCandidate = await this.candidateRepository.findByEmail(
      data.email
    );
    if (existingCandidate) {
      throw new Error("Candidate with this email already exists");
    }

    // Create new candidate
    const candidate = Candidate.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      resumeUrl: data.resumeUrl,
      linkedinUrl: data.linkedinUrl,
      skills: data.skills || [],
      experience: data.experience,
      location: data.location,
      salary: data.salary,
      status: CandidateStatus.ACTIVE,
    });

    const savedCandidate = await this.candidateRepository.save(candidate);
    return this.mapToResponseDto(savedCandidate);
  }

  async getCandidateById(id: string): Promise<CandidateResponseDto> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    return this.mapToResponseDto(candidate);
  }

  async getAllCandidates(
    query: CandidateQuery
  ): Promise<CandidateListResponseDto> {
    // For now, implement basic pagination
    // In a real application, you'd implement filtering here
    const candidates = await this.candidateRepository.findAll();
    const total = await this.candidateRepository.count();

    // Simple pagination logic
    const startIndex = (query.page - 1) * query.limit;
    const endIndex = startIndex + query.limit;
    const paginatedCandidates = candidates.slice(startIndex, endIndex);

    return {
      candidates: paginatedCandidates.map((candidate) =>
        this.mapToResponseDto(candidate)
      ),
      total,
      page: query.page,
      limit: query.limit,
    };
  }

  async updateCandidate(
    id: string,
    data: UpdateCandidateRequest
  ): Promise<CandidateResponseDto> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error("Candidate not found");
    }

    // Update candidate properties
    if (
      data.firstName ||
      data.lastName ||
      data.phone !== undefined ||
      data.location !== undefined ||
      data.salary !== undefined
    ) {
      candidate.updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        location: data.location,
        salary: data.salary,
      });
    }

    if (data.skills) {
      candidate.updateSkills(data.skills);
    }

    if (data.experience !== undefined) {
      candidate.updateExperience(data.experience);
    }

    const updatedCandidate = await this.candidateRepository.update(candidate);
    return this.mapToResponseDto(updatedCandidate);
  }

  async deleteCandidate(id: string): Promise<void> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error("Candidate not found");
    }

    await this.candidateRepository.delete(id);
  }

  async activateCandidate(id: string): Promise<CandidateResponseDto> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error("Candidate not found");
    }

    candidate.activate();
    const updatedCandidate = await this.candidateRepository.update(candidate);
    return this.mapToResponseDto(updatedCandidate);
  }

  async deactivateCandidate(id: string): Promise<CandidateResponseDto> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error("Candidate not found");
    }

    candidate.deactivate();
    const updatedCandidate = await this.candidateRepository.update(candidate);
    return this.mapToResponseDto(updatedCandidate);
  }

  async searchCandidatesBySkills(
    skills: string[]
  ): Promise<CandidateResponseDto[]> {
    const candidates = await this.candidateRepository.findBySkills(skills);
    return candidates.map((candidate) => this.mapToResponseDto(candidate));
  }

  async searchCandidatesByExperience(
    minYears: number,
    maxYears: number
  ): Promise<CandidateResponseDto[]> {
    const candidates = await this.candidateRepository.findByExperienceRange(
      minYears,
      maxYears
    );
    return candidates.map((candidate) => this.mapToResponseDto(candidate));
  }

  private mapToResponseDto(candidate: Candidate): CandidateResponseDto {
    const candidateData = candidate.toJSON();
    return {
      id: candidateData.id,
      email: candidateData.email,
      firstName: candidateData.firstName,
      lastName: candidateData.lastName,
      fullName: candidate.fullName,
      phone: candidateData.phone,
      resumeUrl: candidateData.resumeUrl,
      linkedinUrl: candidateData.linkedinUrl,
      skills: candidateData.skills,
      experience: candidateData.experience,
      location: candidateData.location,
      salary: candidateData.salary,
      status: candidateData.status,
      createdAt: candidateData.createdAt.toISOString(),
      updatedAt: candidateData.updatedAt.toISOString(),
    };
  }
}
