"use client";

import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

export default function VerifyEmail() {
  const router = useRouter();
  const { session, isVerified } = useAuth();

  //   if (loading) return <p>Cargando...</p>;

  if (!session) {
    router.push("/"); // si no hay sesión, fuera
    return null;
  }

  if (isVerified) {
    router.push("/dashboard"); // si ya verificó → dashboard
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Verifica tu correo</h1>
      <p className="mb-4">
        Te hemos enviado un enlace de confirmación. Por favor revisa tu bandeja
        de entrada y confirma tu correo para continuar.
      </p>
      <button
        onClick={async () => {
          await authService.signOut();
          router.push("/");
        }}
        className="bg-black text-white rounded p-2"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
