import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Navigation from "./navigation";

const ComSupabaseListener = async () => {
  const supbase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supbase.auth.getSession();

  return <Navigation session={session} />;
};

export default ComSupabaseListener;
