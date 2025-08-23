"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, isVerified, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push("/");
      } else if (!isVerified) {
        router.push("/verify-email");
      }
    }
  }, [session, isVerified, loading, router]);

  if (loading) return <p>Cargando...</p>;
  if (!session || !isVerified) return null;

  return <>{children}</>;
}
