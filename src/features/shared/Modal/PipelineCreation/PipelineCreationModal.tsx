"use client";

import { createPortal } from "react-dom";
import React, { useState } from "react";

interface PipelineCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PipelineCreationData) => void;
  isLoading?: boolean;
}

export interface PipelineCreationData {
  name: string;
  description?: string;
  segments: string[];
}

const PipelineCreationModal: React.FC<PipelineCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<PipelineCreationData>({
    name: "",
    description: "",
    segments: ["Started", "In Progress", "Completed"],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Pipeline name is required";
    }
    if (formData.segments.length === 0) {
      newErrors.segments = "At least one segment is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleSegmentChange = (index: number, value: string) => {
    const newSegments = [...formData.segments];
    newSegments[index] = value;
    setFormData({ ...formData, segments: newSegments });
  };

  const addSegment = () => {
    setFormData({
      ...formData,
      segments: [...formData.segments, ""],
    });
  };

  const removeSegment = (index: number) => {
    if (formData.segments.length > 1) {
      const newSegments = formData.segments.filter((_, i) => i !== index);
      setFormData({ ...formData, segments: newSegments });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      segments: ["Started", "In Progress", "Completed"],
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create New Pipeline
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pipeline Name */}
          <div>
            <label
              htmlFor="pipeline-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pipeline Name *
            </label>
            <input
              id="pipeline-name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:outline-none dark:bg-gray-800 dark:text-white ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600"
              }`}
              placeholder="Enter pipeline name"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Pipeline Description */}
          <div>
            <label
              htmlFor="pipeline-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description (Optional)
            </label>
            <textarea
              id="pipeline-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Enter pipeline description"
              disabled={isLoading}
            />
          </div>

          {/* Pipeline Segments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Pipeline Segments *
            </label>
            <div className="mt-2 space-y-2">
              {formData.segments.map((segment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={segment}
                    onChange={(e) => handleSegmentChange(index, e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder={`Segment ${index + 1}`}
                    disabled={isLoading}
                  />
                  {formData.segments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSegment(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      disabled={isLoading}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSegment}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              disabled={isLoading}
            >
              + Add Segment
            </button>
            {errors.segments && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.segments}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:focus:ring-offset-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Pipeline"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default PipelineCreationModal;
