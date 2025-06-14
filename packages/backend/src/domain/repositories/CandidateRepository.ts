import { Candidate } from "../entities/Candidate";

export interface CandidateRepository {
  findAll(): Promise<Candidate[]>;
  findById(id: string): Promise<Candidate | null>;
  findByEmail(email: string): Promise<Candidate | null>;
  save(candidate: Candidate): Promise<Candidate>;
  update(candidate: Candidate): Promise<Candidate>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
  findBySkills(skills: string[]): Promise<Candidate[]>;
  findByExperienceRange(
    minYears: number,
    maxYears: number
  ): Promise<Candidate[]>;
}
