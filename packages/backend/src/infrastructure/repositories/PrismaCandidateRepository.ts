import { Candidate, CandidateStatus } from "../../domain/entities/Candidate";
import { CandidateRepository } from "../../domain/repositories/CandidateRepository";
import { prisma } from "../database/PrismaClient";
import { Candidate as PrismaCandidate } from "@prisma/client";

export class PrismaCandidateRepository implements CandidateRepository {
  async findAll(): Promise<Candidate[]> {
    const prismaCandidate = await prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return prismaCandidate.map(this.toDomainEntity);
  }

  async findById(id: string): Promise<Candidate | null> {
    const prismaCandidate = await prisma.candidate.findUnique({
      where: { id },
    });

    return prismaCandidate ? this.toDomainEntity(prismaCandidate) : null;
  }

  async findByEmail(email: string): Promise<Candidate | null> {
    const prismaCandidate = await prisma.candidate.findUnique({
      where: { email },
    });

    return prismaCandidate ? this.toDomainEntity(prismaCandidate) : null;
  }

  async save(candidate: Candidate): Promise<Candidate> {
    const candidateData = candidate.toJSON();

    const prismaCandidate = await prisma.candidate.create({
      data: {
        id: candidateData.id,
        email: candidateData.email,
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        phone: candidateData.phone,
        resumeUrl: candidateData.resumeUrl,
        linkedinUrl: candidateData.linkedinUrl,
        skills: candidateData.skills,
        experience: candidateData.experience,
        location: candidateData.location,
        salary: candidateData.salary,
        status: candidateData.status,
        createdAt: candidateData.createdAt,
        updatedAt: candidateData.updatedAt,
      },
    });

    return this.toDomainEntity(prismaCandidate);
  }

  async update(candidate: Candidate): Promise<Candidate> {
    const candidateData = candidate.toJSON();

    const prismaCandidate = await prisma.candidate.update({
      where: { id: candidateData.id },
      data: {
        email: candidateData.email,
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        phone: candidateData.phone,
        resumeUrl: candidateData.resumeUrl,
        linkedinUrl: candidateData.linkedinUrl,
        skills: candidateData.skills,
        experience: candidateData.experience,
        location: candidateData.location,
        salary: candidateData.salary,
        status: candidateData.status,
        updatedAt: candidateData.updatedAt,
      },
    });

    return this.toDomainEntity(prismaCandidate);
  }

  async delete(id: string): Promise<void> {
    await prisma.candidate.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return await prisma.candidate.count();
  }

  async findBySkills(skills: string[]): Promise<Candidate[]> {
    const prismaCandidate = await prisma.candidate.findMany({
      where: {
        skills: {
          hasSome: skills,
        },
      },
    });

    return prismaCandidate.map(this.toDomainEntity);
  }

  async findByExperienceRange(
    minYears: number,
    maxYears: number
  ): Promise<Candidate[]> {
    const prismaCandidate = await prisma.candidate.findMany({
      where: {
        experience: {
          gte: minYears,
          lte: maxYears,
        },
      },
    });

    return prismaCandidate.map(this.toDomainEntity);
  }

  private toDomainEntity(prismaCandidate: PrismaCandidate): Candidate {
    return new Candidate({
      id: prismaCandidate.id,
      email: prismaCandidate.email,
      firstName: prismaCandidate.firstName,
      lastName: prismaCandidate.lastName,
      phone: prismaCandidate.phone ?? undefined,
      resumeUrl: prismaCandidate.resumeUrl ?? undefined,
      linkedinUrl: prismaCandidate.linkedinUrl ?? undefined,
      skills: prismaCandidate.skills,
      experience: prismaCandidate.experience,
      location: prismaCandidate.location ?? undefined,
      salary: prismaCandidate.salary ?? undefined,
      status: prismaCandidate.status as CandidateStatus,
      createdAt: prismaCandidate.createdAt,
      updatedAt: prismaCandidate.updatedAt,
    });
  }
}
