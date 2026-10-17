import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { getServerSession } from "@/lib/server/auth";
import AdminLayout from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/_admin")({
  beforeLoad: async () => {
    const { session } = await getServerSession();
    if (!session) throw redirect({ to: "/login" });
  },
  component: () => <AdminLayout><Outlet /></AdminLayout>,
});
