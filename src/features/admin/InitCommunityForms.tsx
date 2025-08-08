"use client";

import { useState } from "react";
import { communityNamesEnum } from "@/api/apis"; // Adjust path if needed
import { api } from "@/trpc/react";
import { useCachedSession } from "@/hooks/userCachedSession";

export function InitializeCommunityFormsButton() {
  const [isInitializing, setIsInitializing] = useState(false);
  const utils = api.useUtils();
  const { data: session } = useCachedSession();
  const { data: existingForms } = api.communityForms.grabAll.useQuery();
  const createForm = api.communityForms.createForm.useMutation();
  const createQuestion = api.communityQuestions.createQuestion.useMutation();

  const handleInitialize = async () => {
    if (!session?.user?.id) return;

    setIsInitializing(true);

    const allCommunities = Object.values(communityNamesEnum.enum);
    const existingTags = new Set(existingForms?.map((f) => f.communityTag));

    for (const tag of allCommunities) {
      if (!existingTags.has(tag)) {
        // Create form
        const formResult = await createForm.mutateAsync({
          for: tag,
          createdById: session.user.id,
          isActive: true,
          title: `${tag} Community Interest Form`,
          description: `Form for students interested in the ${tag} community.`,
        });

        if (formResult.success) {
          const formId = formResult.success.id;

          // Add standard questions
          await createQuestion.mutateAsync({
            formId,
            label: "What interests you about this community?",
            type: "TEXT",
            order: 0,
          });

          await createQuestion.mutateAsync({
            formId,
            label: "Do you have experience in this area?",
            type: "BOOLEAN",
            order: 1,
          });

          await createQuestion.mutateAsync({
            formId,
            label: "What do you hope to gain by joining?",
            type: "TEXT",
            order: 2,
          });
        }
      }
    }

    await utils.communityForms.grabAll.invalidate();
    setIsInitializing(false);
    alert("Community forms initialized!");
  };

  return (
    <div className="p-4">
      <button
        disabled={isInitializing}
        onClick={handleInitialize}
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isInitializing ? "Initializing..." : "Initialize Community Forms"}
      </button>
    </div>
  );
}
