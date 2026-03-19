import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.ts";
import { Navigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);

  if (user === undefined) {
    return <div>Loading.....</div>;
  }
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}
