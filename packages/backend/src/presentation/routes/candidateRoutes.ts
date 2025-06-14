import { Router } from "express";
import { CandidateController } from "../controllers/CandidateController";

export function createCandidateRoutes(
  candidateController: CandidateController
): Router {
  const router = Router();

  // CRUD operations
  router.post("/", candidateController.createCandidate);
  router.get("/", candidateController.getAllCandidates);
  router.get("/:id", candidateController.getCandidateById);
  router.put("/:id", candidateController.updateCandidate);
  router.delete("/:id", candidateController.deleteCandidate);

  // Status management
  router.patch("/:id/activate", candidateController.activateCandidate);
  router.patch("/:id/deactivate", candidateController.deactivateCandidate);

  // Search operations
  router.get("/search/skills", candidateController.searchBySkills);
  router.get("/search/experience", candidateController.searchByExperience);

  return router;
}
