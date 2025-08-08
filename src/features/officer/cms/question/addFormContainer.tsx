"use client";

import { useEffect, useRef, useState } from "react";
import { useCachedSession } from "@/hooks/userCachedSession";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { type CommunityName } from "@prisma/client";

const AddFormContainer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session } = useCachedSession();
  const utils = api.useUtils();
  const router = useRouter();

  // ✅ Always call hooks before conditional return
  const userId = session?.user?.id ?? "";
  const { data: memberships, isLoading: loadingMemberships } =
    api.membership.findUserMemberships.useQuery(userId);

  const addFormMutation = api.communityForms.createForm.useMutation({
    onSuccess: async (result) => {
      if (result.failure) {
        console.error(result.failure);
        alert(result.failure);
        return;
      }

      const form = result.success;
      if (!form) {
        console.error("Unexpected: success is null but failure is also null");
        return;
      }

      await utils.communityForms.grabAll.invalidate();
      router.push(`/officer/cms/questions/${form.id}`);
    },
  });

  const handleAddForm = (communityName: CommunityName) => {
    if (!session?.user?.id) return;

    addFormMutation.mutate({
      for: communityName,
      createdById: session.user.id,
      isActive: false,
      title: "New Form",
      description: "Auto-generated form",
    });

    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!session) return <div>... no session</div>;

  return (
    <div className="flex flex-row justify-between items-start">
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="standard-btn cursor-pointer"
        >
          + Form
        </button>

        {isDropdownOpen && (
          <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-bg border z-10">
            {loadingMemberships ? (
              <div className="px-4 py-2 text-sm">Loading...</div>
            ) : (
              memberships?.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleAddForm(m.community.name)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text"
                >
                  {m.community.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div>Placeholder</div>
    </div>
  );
};

export default AddFormContainer;
