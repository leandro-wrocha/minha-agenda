"use client";

import { signIn } from "next-auth/react";

// login sem a janela como popup por enquanto
export const CallLoginWithGoogle = () => {
  return (
    <button
      className="h-10 rounded-xl bg-[#4BB05B] px-6 text-sm font-bold text-white"
      onClick={() => signIn("google")}
    >
      Entrar com Google
    </button>
  );
};
