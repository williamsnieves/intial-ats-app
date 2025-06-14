import { useQuery, useMutation, useQueryClient } from "react-query";
import { candidateService } from "../api/candidateService";
import {
  Candidate,
  CandidateQuery,
  CreateCandidateRequest,
  UpdateCandidateRequest,
} from "../../../shared/types/candidate";
import { toast } from "react-hot-toast";

// Query keys
export const candidateKeys = {
  all: ["candidates"] as const,
  lists: () => [...candidateKeys.all, "list"] as const,
  list: (query?: CandidateQuery) => [...candidateKeys.lists(), query] as const,
  details: () => [...candidateKeys.all, "detail"] as const,
  detail: (id: string) => [...candidateKeys.details(), id] as const,
};

// Get candidates list with filtering
export const useCandidates = (query?: CandidateQuery) => {
  return useQuery({
    queryKey: candidateKeys.list(query),
    queryFn: () => candidateService.getCandidates(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single candidate
export const useCandidate = (id: string) => {
  return useQuery({
    queryKey: candidateKeys.detail(id),
    queryFn: () => candidateService.getCandidate(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create candidate mutation
export const useCreateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCandidateRequest) =>
      candidateService.createCandidate(data),
    onSuccess: () => {
      queryClient.invalidateQueries(candidateKeys.lists());
      toast.success("Candidate created successfully!");
    },
    onError: () => {
      toast.error("Failed to create candidate");
    },
  });
};

// Update candidate mutation
export const useUpdateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCandidateRequest }) =>
      candidateService.updateCandidate(id, data),
    onSuccess: (updatedCandidate: Candidate) => {
      queryClient.invalidateQueries(candidateKeys.lists());
      queryClient.setQueryData(
        candidateKeys.detail(updatedCandidate.id),
        updatedCandidate
      );
      toast.success("Candidate updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update candidate");
    },
  });
};

// Delete candidate mutation
export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => candidateService.deleteCandidate(id),
    onSuccess: () => {
      queryClient.invalidateQueries(candidateKeys.lists());
      toast.success("Candidate deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete candidate");
    },
  });
};

// Activate candidate mutation
export const useActivateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => candidateService.activateCandidate(id),
    onSuccess: (updatedCandidate: Candidate) => {
      queryClient.invalidateQueries(candidateKeys.lists());
      queryClient.setQueryData(
        candidateKeys.detail(updatedCandidate.id),
        updatedCandidate
      );
      toast.success("Candidate activated successfully!");
    },
    onError: () => {
      toast.error("Failed to activate candidate");
    },
  });
};

// Deactivate candidate mutation
export const useDeactivateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => candidateService.deactivateCandidate(id),
    onSuccess: (updatedCandidate: Candidate) => {
      queryClient.invalidateQueries(candidateKeys.lists());
      queryClient.setQueryData(
        candidateKeys.detail(updatedCandidate.id),
        updatedCandidate
      );
      toast.success("Candidate deactivated successfully!");
    },
    onError: () => {
      toast.error("Failed to deactivate candidate");
    },
  });
};
