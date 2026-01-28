"use client";

import { useState } from "react";
import { signUp } from "./actions";

export default function SignUpPage() {
  const [role, setRole] = useState<"USER" | "CREATOR">("USER");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#a394cc] p-4">
      <div className="w-full max-w-md space-y-8 rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-2xl">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-black text-[#1a1c2e]">
            Create Account
          </h2>
          <p className="text-sm font-medium text-gray-400">
            Join Proof Project today
          </p>
        </div>

        {}
        <div className="mb-8 flex rounded-2xl border border-gray-200 bg-gray-100 p-1.5">
          <button
            type="button"
            onClick={() => setRole("USER")}
            className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
              role === "USER"
                ? "bg-[#949494] text-white shadow-md"
                : "text-gray-400"
            }`}
          >
            user
          </button>
          <button
            type="button"
            onClick={() => setRole("CREATOR")}
            className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
              role === "CREATOR"
                ? "bg-[#949494] text-white shadow-md"
                : "text-gray-400"
            }`}
          >
            creator
          </button>
        </div>

        <form className="space-y-4" action={signUp}>
          {}
          <input type="hidden" name="role" value={role} />

          <div className="space-y-3">
            <input
              name="name"
              type="text"
              required
              placeholder="Full Name"
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-black transition-all outline-none focus:ring-2 focus:ring-[#a394cc]/20"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="admin@test.com"
              className="w-full rounded-2xl border border-gray-100 bg-[#eff6ff] px-5 py-4 text-black transition-all outline-none focus:ring-2 focus:ring-[#a394cc]/20"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-2xl border border-gray-100 bg-[#eff6ff] px-5 py-4 text-black transition-all outline-none focus:ring-2 focus:ring-[#a394cc]/20"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-black p-5 text-[10px] font-black tracking-[0.3em] text-white uppercase shadow-xl transition-all hover:bg-gray-900 active:scale-95"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
