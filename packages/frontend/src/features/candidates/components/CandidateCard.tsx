import React from "react";
import { Candidate } from "../../../shared/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onView,
  onEdit,
  onDelete,
}) => {
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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {candidate.firstName} {candidate.lastName}
          </h3>
          <p className="text-gray-600">{candidate.email}</p>
          {candidate.phone && (
            <p className="text-gray-600">{candidate.phone}</p>
          )}
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            candidate.status
          )}`}
        >
          {candidate.status}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Experience:</span>{" "}
          {candidate.experience} years
        </p>
        {candidate.location && (
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Location:</span> {candidate.location}
          </p>
        )}
        {candidate.salary && (
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Expected Salary:</span> $
            {candidate.salary.toLocaleString()}
          </p>
        )}
      </div>

      {candidate.skills && candidate.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {candidate.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{candidate.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onView(candidate.id)}
          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
        >
          View
        </button>
        <button
          onClick={() => onEdit(candidate.id)}
          className="px-3 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(candidate.id)}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
