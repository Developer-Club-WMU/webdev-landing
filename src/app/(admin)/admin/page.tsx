"use client";

import { useEffect } from "react";
import CommunityHealthDashboard from "@/features/admin/CommunityStatus";
import { useCachedSession } from "@/hooks/userCachedSession";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import AddMembershipForm from "@/features/officer/cms/community/AddCommunityMembershipForm";
import { InitializeCommunityFormsButton } from "@/features/admin/InitCommunityForms";
import AttachMembershipForm from "@/features/admin/AddMembership";

const AdminDashboard = () => {
  const session = useCachedSession();
  const router = useRouter();

  const { data: user, isError, isLoading } = api.user.getById.useQuery(
    { id: session.data?.user.id ?? "" },
    { enabled: !!session.data?.user.id }
  );

  useEffect(() => {
    if (user && user.userRole !== "ADMIN") {
      router.replace("/");
    }
  }, [user, router]);

  if (!session.data || isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Error loading user data</div>;
  if (user.userRole !== "ADMIN") return null; // avoid flashing the admin panel before redirect

  return (
    <div>
      <CommunityHealthDashboard />
      <AddMembershipForm />
      <InitializeCommunityFormsButton />
      <AttachMembershipForm />
    </div>
  );
};

export default AdminDashboard;
