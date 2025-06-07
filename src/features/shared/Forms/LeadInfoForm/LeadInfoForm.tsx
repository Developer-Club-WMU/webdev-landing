import type { LeadFormProps } from "@/models";
import type { LeadInfo } from "@/models/schema";
import React, { useState } from "react";

const LeadForm: React.FC<LeadFormProps> = ({
  initialValues = {},
  onSubmit,
}) => {
  const [form, setForm] = useState<Partial<LeadInfo>>({
    ...initialValues,
    tags: initialValues.tags ?? [],
    isArchived: initialValues.isArchived ?? false,
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

    const payload: LeadInfo = {
      ...form,
      id: form.id ?? crypto.randomUUID(), // fallback if not set
      title: form.title ?? "",
      description: form.description ?? "",
      capitalValue: Number(form.capitalValue) || 0,
      contactName: form.contactName ?? "",
      companyName: form.companyName ?? "",
      addedOn: form.addedOn ?? new Date().toISOString(),
      dueDate: form.dueDate ?? new Date().toISOString(),
      status: form.status ?? "new",
      leadType: form.leadType ?? "customer",
      isArchived: form.isArchived ?? false,
      tags: form.tags ?? [],
    };

    onSubmit(payload);
  };

  return (
    // <div className="h-3/5">
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
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
        className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Save Lead
      </button>
    </form>
    // </div>
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
