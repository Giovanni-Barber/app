"use client";

import { authService } from "@/services/authService";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { session } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Bienvenido, {session?.user.email}</p>

        <button
          onClick={async () => {
            await authService.signOut();
            router.push("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </ProtectedRoute>
  );
}
