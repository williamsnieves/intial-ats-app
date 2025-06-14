import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCandidate } from "../hooks/useCandidates";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: candidate, isLoading, error } = useCandidate(id!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Candidate Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The candidate you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/candidates")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Candidates
        </button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "HIRED":
        return "bg-blue-100 text-blue-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/candidates")}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Candidates
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {candidate.firstName} {candidate.lastName}
            </h1>
            <p className="text-gray-600 text-lg">{candidate.email}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              candidate.status
            )}`}
          >
            {candidate.status}
          </span>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-gray-900">{candidate.email}</p>
              </div>
              {candidate.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900">{candidate.phone}</p>
                </div>
              )}
              {candidate.location && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <p className="text-gray-900">{candidate.location}</p>
                </div>
              )}
              {candidate.linkedinUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                  <a
                    href={candidate.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {candidate.linkedinUrl}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Professional Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <p className="text-gray-900">{candidate.experience} years</p>
              </div>
              {candidate.salary && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Salary
                  </label>
                  <p className="text-gray-900">
                    ${candidate.salary.toLocaleString()}
                  </p>
                </div>
              )}
              {candidate.resumeUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Resume
                  </label>
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => navigate(`/candidates/${candidate.id}/edit`)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Edit Candidate
          </button>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this candidate?"
                )
              ) {
                // TODO: Implement delete functionality
                navigate("/candidates");
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete Candidate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailPage;
