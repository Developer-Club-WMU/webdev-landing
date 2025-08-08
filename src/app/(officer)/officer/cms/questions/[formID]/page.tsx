"use client";

import QuestionBuilder from "@/features/officer/cms/question/question-builder/question-builder";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

const CommunityFormPage = () => {
  const params = useParams();
  const formId = params?.formID as string | undefined;

  const { data: form, isLoading } = api.communityForms.getById.useQuery(
    { id: formId ?? "" },
    { enabled: !!formId }
  );

  if (!formId) return <div>Invalid form ID</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;

  return (
    <div>
      <h1 className="text-xl font-bold">{form.title}</h1>
      <QuestionBuilder form={form} />
    </div>
  );
};

export default CommunityFormPage;
