import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { session, profile, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-secondary">
        <Loader2 className="size-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (!session || !profile) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
