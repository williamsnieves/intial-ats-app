import { Request, Response } from "express";
import { CandidateUseCases } from "../../application/use-cases/CandidateUseCases";
import {
  CreateCandidateDto,
  UpdateCandidateDto,
  CandidateQueryDto,
} from "../../application/dtos/CandidateDto";

export class CandidateController {
  constructor(private readonly candidateUseCases: CandidateUseCases) {}

  createCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = CreateCandidateDto.parse(req.body);
      const candidate = await this.candidateUseCases.createCandidate(
        validatedData
      );

      res.status(201).json({
        success: true,
        data: candidate,
        message: "Candidate created successfully",
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getCandidateById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const candidate = await this.candidateUseCases.getCandidateById(id);

      res.status(200).json({
        success: true,
        data: candidate,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getAllCandidates = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = CandidateQueryDto.parse({
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        search: req.query.search as string,
        skills: req.query.skills
          ? (req.query.skills as string).split(",")
          : undefined,
        minExperience: req.query.minExperience
          ? parseInt(req.query.minExperience as string)
          : undefined,
        maxExperience: req.query.maxExperience
          ? parseInt(req.query.maxExperience as string)
          : undefined,
        location: req.query.location as string,
        status: req.query.status as
          | "ACTIVE"
          | "INACTIVE"
          | "BLACKLISTED"
          | undefined,
      });

      const result = await this.candidateUseCases.getAllCandidates(query);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  updateCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const validatedData = UpdateCandidateDto.parse(req.body);
      const candidate = await this.candidateUseCases.updateCandidate(
        id,
        validatedData
      );

      res.status(200).json({
        success: true,
        data: candidate,
        message: "Candidate updated successfully",
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  deleteCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.candidateUseCases.deleteCandidate(id);

      res.status(200).json({
        success: true,
        message: "Candidate deleted successfully",
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  activateCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const candidate = await this.candidateUseCases.activateCandidate(id);

      res.status(200).json({
        success: true,
        data: candidate,
        message: "Candidate activated successfully",
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  deactivateCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const candidate = await this.candidateUseCases.deactivateCandidate(id);

      res.status(200).json({
        success: true,
        data: candidate,
        message: "Candidate deactivated successfully",
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  searchBySkills = async (req: Request, res: Response): Promise<void> => {
    try {
      const { skills } = req.query;
      if (!skills || typeof skills !== "string") {
        res.status(400).json({
          success: false,
          message: "Skills parameter is required",
        });
        return;
      }

      const skillsArray = skills.split(",").map((skill) => skill.trim());
      const candidates = await this.candidateUseCases.searchCandidatesBySkills(
        skillsArray
      );

      res.status(200).json({
        success: true,
        data: candidates,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  searchByExperience = async (req: Request, res: Response): Promise<void> => {
    try {
      const { minYears, maxYears } = req.query;

      if (!minYears || !maxYears) {
        res.status(400).json({
          success: false,
          message: "Both minYears and maxYears parameters are required",
        });
        return;
      }

      const min = parseInt(minYears as string);
      const max = parseInt(maxYears as string);

      if (isNaN(min) || isNaN(max)) {
        res.status(400).json({
          success: false,
          message: "Invalid experience range values",
        });
        return;
      }

      const candidates =
        await this.candidateUseCases.searchCandidatesByExperience(min, max);

      res.status(200).json({
        success: true,
        data: candidates,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): void {
    console.error("Controller Error:", error);

    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (error.message.includes("already exists")) {
        res.status(409).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (
        error.message.includes("Invalid") ||
        error.message.includes("required")
      ) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
