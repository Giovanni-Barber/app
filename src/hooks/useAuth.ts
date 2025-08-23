"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const user = session?.user ?? null;
  const isVerified = Boolean(user?.email_confirmed_at);

  return { session, user, isVerified, loading };
}
