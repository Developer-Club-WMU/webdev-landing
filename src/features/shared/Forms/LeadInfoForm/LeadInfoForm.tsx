import type { LeadInfo } from "@/models/schema";
import type { LeadStatus } from "@/models";
import React, { useState } from "react";
import { api } from "@/trpc/react";

interface LeadFormPropsExtended {
  initialValues?: Partial<LeadInfo>;
  onSubmit?: (lead: LeadInfo) => void;
  pipelineId?: string;
  segmentId?: number;
  segmentName?: string;
}

const LeadForm: React.FC<LeadFormPropsExtended> = ({
  initialValues = {},
  onSubmit,
  pipelineId,
  segmentId,
  segmentName,
}) => {
  const [form, setForm] = useState<Partial<LeadInfo>>({
    ...initialValues,
    tags: initialValues.tags ?? [],
    isArchived: initialValues.isArchived ?? false,
    status: initialValues.status ?? (segmentName as LeadStatus) ?? "new",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const utils = api.useUtils();

  // Create lead mutation
  const createLead = api.crm.leads.create.useMutation({
    onSuccess: (createdLead) => {
      setIsSubmitting(false);
      setSubmitError(null);

      // Invalidate relevant queries to refresh the UI
      if (pipelineId) {
        void utils.crm.leads.getByPipelineId.invalidate({ pipelineId });
      }
      void utils.crm.leads.getAll.invalidate();

      // Convert database lead to LeadInfo format
      const leadInfo: LeadInfo = {
        id: createdLead.id,
        title: createdLead.title,
        description: createdLead.description ?? "",
        capitalValue: createdLead.capitalValue ?? 0,
        contactName: createdLead.contactName,
        companyName: createdLead.companyName,
        avatarURL: createdLead.avatarURL ?? undefined,
        addedOn: createdLead.addedOn.toISOString(),
        dueDate: createdLead.dueDate?.toISOString() ?? new Date().toISOString(),
        status: createdLead.status as LeadStatus,
        leadType: createdLead.leadType as
          | "customer"
          | "partner"
          | "vendor"
          | "individual",
        pipelineStage: createdLead.pipelineStage ?? undefined,
        isArchived: createdLead.isArchived,
        source: createdLead.source ?? undefined,
        tags: createdLead.tags,
        ownerID: createdLead.createdById,
      };

      if (onSubmit) {
        onSubmit(leadInfo);
      }
    },
    onError: (error) => {
      setIsSubmitting(false);
      setSubmitError(error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    const nextValue =
      type === "checkbox" && target instanceof HTMLInputElement
        ? target.checked
        : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setForm((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Prepare data for API
    const leadData = {
      title: form.title ?? "",
      description: form.description ?? "",
      capitalValue: Number(form.capitalValue) || 0,
      contactName: form.contactName ?? "",
      companyName: form.companyName ?? "",
      avatarURL: form.avatarURL ?? undefined,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
      status: form.status ?? segmentName ?? "new",
      leadType: form.leadType ?? "customer",
      pipelineStage: form.pipelineStage,
      source: form.source,
      tags: form.tags ?? [],
      pipelineId,
      segmentId,
    };

    createLead.mutate(leadData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      {submitError && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          Error: {submitError}
        </div>
      )}

      {pipelineId && segmentName && (
        <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
          Adding lead to: <strong>{segmentName}</strong>
        </div>
      )}
      <Input
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <Textarea
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
      />

      <Input
        name="capitalValue"
        label="Capital ($)"
        type="number"
        value={form.capitalValue}
        onChange={handleChange}
      />
      <Input
        name="avatarURL"
        label="Avatar URL"
        value={form.avatarURL}
        onChange={handleChange}
      />
      <Input
        name="contactName"
        label="Contact Name"
        value={form.contactName}
        onChange={handleChange}
        required
      />
      <Input
        name="companyName"
        label="Company Name"
        value={form.companyName}
        onChange={handleChange}
        required
      />
      <Input
        name="addedOn"
        label="Added On"
        type="date"
        value={form.addedOn?.slice(0, 10)}
        onChange={handleChange}
      />
      <Input
        name="dueDate"
        label="Due Date"
        type="date"
        value={form.dueDate?.slice(0, 10)}
        onChange={handleChange}
      />

      <Select
        name="status"
        label="Status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="new">New</option>
        <option value="qualified">Qualified</option>
        <option value="working">Working</option>
        <option value="proposal">Proposal</option>
        <option value="negotiation">Negotiation</option>
        <option value="closed_won">Closed - Won</option>
        <option value="closed_lost">Closed - Lost</option>
      </Select>

      <Select
        name="leadType"
        label="Lead Type"
        value={form.leadType}
        onChange={handleChange}
      >
        <option value="customer">Customer</option>
        <option value="partner">Partner</option>
        <option value="vendor">Vendor</option>
        <option value="individual">Individual</option>
      </Select>

      <Input
        name="pipelineStage"
        label="Pipeline Stage"
        value={form.pipelineStage}
        onChange={handleChange}
      />
      <Input
        name="source"
        label="Source"
        value={form.source}
        onChange={handleChange}
      />
      <Input
        name="ownerID"
        label="Owner ID"
        value={form.ownerID}
        onChange={handleChange}
      />
      <Input
        name="tags"
        label="Tags (comma-separated)"
        value={form.tags?.join(", ") ?? ""}
        onChange={handleTagsChange}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isArchived"
          checked={form.isArchived}
          onChange={handleChange}
          className="accent-blue-600"
        />
        Archived
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Lead"}
      </button>
    </form>
  );
};

const Input = ({
  name,
  label,
  value,
  type = "text",
  onChange,
  required = false,
}: {
  name: string;
  label: string;
  value?: string | number;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value ?? ""}
      onChange={onChange}
      required={required}
      className="rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);

const Textarea = ({
  name,
  label,
  value,
  onChange,
}: {
  name: string;
  label: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className="rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      rows={3}
    />
  </div>
);

const Select = ({
  name,
  label,
  value,
  onChange,
  children,
}: {
  name: string;
  label: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className="rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      {children}
    </select>
  </div>
);

export default LeadForm;
