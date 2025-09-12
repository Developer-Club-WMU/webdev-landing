"use client";

import AttachMembershipForm from "@/features/admin/AddMembership";
import CommunityHealthDashboard from "@/features/admin/CommunityStatus";
import { InitializeCommunityFormsButton } from "@/features/admin/InitCommunityForms";
import ToggleAdminForm from "@/features/admin/ToggleAdmin";
import AddMembershipForm from "@/features/officer/cms/community/AddCommunityMembershipForm";
import { useCachedSession } from "@/hooks/userCachedSession";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <CommunityHealthDashboard />
      <AddMembershipForm />
      <InitializeCommunityFormsButton />
      <AttachMembershipForm />
      <ToggleAdminForm />
    </div>
  );
};

export default AdminDashboard;
