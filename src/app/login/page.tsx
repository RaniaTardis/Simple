"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
      router.refresh();
    } else {
      alert("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#b3b4d3] bg-[radial-gradient(at_top_right,_#d1d2e8_0%,_#b3b4d3_40%,_#8e91c1_100%)] p-4 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-[2.5rem] border border-white/20 bg-white/95 p-10 shadow-xl backdrop-blur-md">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-black text-[#1a1c2e]">Sign In</h2>
          <p className="text-sm font-medium text-gray-400">
            Proof Project Dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="mb-2 ml-1 block text-left text-sm font-bold text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-gray-100 bg-[#f0f4ff] px-4 py-3 text-gray-700 transition-all focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:outline-none"
                placeholder="test@user.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 ml-1 block text-left text-sm font-bold text-gray-500">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full rounded-xl border border-gray-100 bg-[#f0f4ff] px-4 py-3 text-gray-700 transition-all focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:outline-none"
                  placeholder="••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-xl bg-black py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-gray-900 focus:outline-none active:scale-[0.99]"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-gray-500">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-black underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
