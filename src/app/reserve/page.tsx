"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { session, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");

  // 👇 Solo redirigir cuando se sabe que SÍ hay sesión
  useEffect(() => {
    if (!loading && session) {
      router.push("/dashboard");
    }
  }, [session, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await authService.signIn(email, password);
      } else {
        await authService.signUp(email, password, phone);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando...</p>; // evita parpadeos

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "Inicia sesión" : "Regístrate"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLogin && (
          <input
            type="tel"
            placeholder="Teléfono"
            className="border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        )}

        <button type="submit" className="bg-black text-white rounded p-2">
          {isLogin ? "Entrar" : "Registrar"}
        </button>
      </form>

      <button className="mt-4 underline" onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
}
