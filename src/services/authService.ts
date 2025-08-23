import { supabase } from "@/lib/supabaseClient";

export const authService = {
  signUp: async (email: string, password: string, phone: string) => {
    // 1. Registramos el usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard", // URL a donde redirige tras verificar correo
      },
    });

    if (error) throw error;

    // 2. Si se creó el usuario, guardamos el teléfono en la tabla profiles
    if (data.user) {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([{ id: data.user.id, phone }]);

      if (insertError) throw insertError;
    }

    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },
};
