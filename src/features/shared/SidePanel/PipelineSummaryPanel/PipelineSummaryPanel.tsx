"use client";

import type { LeadInfo } from "@/models/schema";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { api } from "@/trpc/react";

interface LeadSummaryPanelProps {
  lead: LeadInfo;
}

const LeadSummaryPanel: React.FC<LeadSummaryPanelProps> = ({ lead }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    title: lead.title,
    description: lead.description,
    capitalValue: lead.capitalValue ?? 0,
    contactName: lead.contactName,
    companyName: lead.companyName,
    avatarURL: lead.avatarURL ?? "",
    dueDate: lead.dueDate ? lead.dueDate.split('T')[0] : "", // Convert to YYYY-MM-DD format
    status: lead.status,
    leadType: lead.leadType,
    pipelineStage: lead.pipelineStage ?? "",
    source: lead.source ?? "",
    tags: lead.tags?.join(", ") ?? "",
    isArchived: lead.isArchived ?? false,
  });
  const [hasChanges, setHasChanges] = useState(false);

  const utils = api.useUtils();

  const updateLead = api.crm.leads.update.useMutation({
    onSuccess: async () => {
      setIsEditing(false);
      setHasChanges(false);
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
      // Invalidate queries to refresh data
      await utils.crm.leads.invalidate();
    },
    onError: (error) => {
      console.error("Failed to update lead:", error.message);
      alert("Failed to update lead: " + error.message);
    },
  });

  // Reset form data when lead prop changes
  useEffect(() => {
    setFormData({
      title: lead.title,
      description: lead.description,
      capitalValue: lead.capitalValue ?? 0,
      contactName: lead.contactName,
      companyName: lead.companyName,
      avatarURL: lead.avatarURL ?? "",
      dueDate: lead.dueDate ? lead.dueDate.split('T')[0] : "",
      status: lead.status,
      leadType: lead.leadType,
      pipelineStage: lead.pipelineStage ?? "",
      source: lead.source ?? "",
      tags: lead.tags?.join(", ") ?? "",
      isArchived: lead.isArchived ?? false,
    });
    setHasChanges(false);
  }, [lead]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" && e.target instanceof HTMLInputElement 
      ? e.target.checked 
      : type === "number" 
        ? Number(value) 
        : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    setHasChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) return;

    const tagsArray = formData.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    updateLead.mutate({
      id: lead.id,
      title: formData.title,
      description: formData.description,
      capitalValue: formData.capitalValue,
      contactName: formData.contactName,
      companyName: formData.companyName,
      avatarURL: formData.avatarURL || undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate + 'T00:00:00').toISOString() : new Date().toISOString(),
      status: formData.status,
      leadType: formData.leadType,
      pipelineStage: formData.pipelineStage || undefined,
      source: formData.source || undefined,
      tags: tagsArray,
      isArchived: formData.isArchived,
    });
  };

  // Keyboard shortcut handler for saving
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && isEditing && hasChanges) {
      e.preventDefault();
      const form = document.getElementById('lead-edit-form') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }
  }, [isEditing, hasChanges]);

  // Add keyboard event listener
  useEffect(() => {
    if (isEditing) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isEditing, handleKeyDown]);

  const handleCancel = () => {
    if (hasChanges) {
      const confirmDiscard = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmDiscard) {
        return;
      }
    }

    setFormData({
      title: lead.title,
      description: lead.description,
      capitalValue: lead.capitalValue ?? 0,
      contactName: lead.contactName,
      companyName: lead.companyName,
      avatarURL: lead.avatarURL ?? "",
      dueDate: lead.dueDate ? lead.dueDate.split('T')[0] : "",
      status: lead.status,
      leadType: lead.leadType,
      pipelineStage: lead.pipelineStage ?? "",
      source: lead.source ?? "",
      tags: lead.tags?.join(", ") ?? "",
      isArchived: lead.isArchived ?? false,
    });
    setIsEditing(false);
    setHasChanges(false);
  };

  const formattedCapital = lead.capitalValue
    ? `$${lead.capitalValue.toLocaleString()}`
    : "—";

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white";
  const selectClassName = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4 p-4 text-sm text-gray-800 dark:text-white">
        {hasChanges && (
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200 text-sm">
            <span>⚠️</span>
            <span>You have unsaved changes. Press Ctrl+S (Cmd+S) to save.</span>
          </div>
        )}
        <form id="lead-edit-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {formData.avatarURL ? (
            <Image
              src={formData.avatarURL}
              alt={formData.contactName}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover shadow"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-700" />
          )}
          <div className="flex-1">
            <input
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              className={inputClassName}
              placeholder="Contact Name"
              required
            />
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`${inputClassName} mt-2`}
              placeholder="Company Name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Avatar URL</label>
          <input
            name="avatarURL"
            type="url"
            value={formData.avatarURL}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Deal Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="Deal Title"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`${inputClassName} resize-none`}
            rows={3}
            placeholder="Deal description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Capital ($)</label>
            <input
              name="capitalValue"
              type="number"
              value={formData.capitalValue}
              onChange={handleInputChange}
              className={inputClassName}
              min="0"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Due Date</label>
            <input
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={selectClassName}
            >
              <option value="new">New</option>
              <option value="qualified">Qualified</option>
              <option value="working">Working</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed_won">Closed - Won</option>
              <option value="closed_lost">Closed - Lost</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Lead Type</label>
            <select
              name="leadType"
              value={formData.leadType}
              onChange={handleInputChange}
              className={selectClassName}
            >
              <option value="customer">Customer</option>
              <option value="partner">Partner</option>
              <option value="vendor">Vendor</option>
              <option value="individual">Individual</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Pipeline Stage</label>
            <input
              name="pipelineStage"
              value={formData.pipelineStage}
              onChange={handleInputChange}
              className={inputClassName}
              placeholder="Pipeline stage"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Source</label>
            <input
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className={inputClassName}
              placeholder="Lead source"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Tags (comma-separated)</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className={inputClassName}
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            name="isArchived"
            type="checkbox"
            checked={formData.isArchived}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm">Archived</label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={!hasChanges || updateLead.isPending}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              hasChanges 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400"
            }`}
          >
            {updateLead.isPending ? "💾 Saving..." : hasChanges ? "💾 Save Changes" : "No Changes"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={updateLead.isPending}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${
              hasChanges
                ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            }`}
          >
            {hasChanges ? "⚠️ Discard Changes" : "Cancel"}
          </button>
        </div>

        {updateLead.isError && (
          <div className="text-red-600 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
            Error: {updateLead.error.message}
          </div>
        )}
      </form>
      </div>
    );
  }

  // Read-only view
  return (
    <div className="flex flex-col gap-4 p-4 text-sm text-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {lead.avatarURL ? (
            <Image
              src={lead.avatarURL}
              alt={lead.contactName}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover shadow"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-700" />
          )}
          <div>
            <h2 className="text-lg font-semibold">{lead.contactName}</h2>
            <p className="text-gray-500 dark:text-gray-400">{lead.companyName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showSuccessMessage && (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm animate-pulse">
              <span>✅</span>
              <span>Changes saved!</span>
            </div>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ✏️ Edit
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 dark:text-gray-300">Deal</h3>
        <p className="text-base font-semibold">{lead.title}</p>
        <p className="text-gray-600 dark:text-gray-400">{lead.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Info label="Capital" value={formattedCapital} />
        <Info label="Status" value={lead.status} />
        <Info label="Lead Type" value={lead.leadType} />
        <Info label="Stage" value={lead.pipelineStage ?? "—"} />
        <Info label="Added On" value={formatDate(lead.addedOn)} />
        <Info label="Due Date" value={formatDate(lead.dueDate)} />
        <Info label="Source" value={lead.source ?? "—"} />
        <Info label="Archived" value={lead.isArchived ? "Yes" : "No"} />
      </div>

      {lead.tags && lead.tags.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Tags</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {lead.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default LeadSummaryPanel;