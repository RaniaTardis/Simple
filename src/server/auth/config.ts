import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";

// 1. تعريف واجهة المستخدم لضمان سلامة الأنواع (Type Safety)
interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials?.email as string },
        });

        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            name: user.name ?? "User",
            email: user.email ?? "",
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as AuthUser;
        token.id = u.id;
        token.role = u.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: typeof token.id === "string" ? token.id : (token.sub ?? ""),
          role: typeof token.role === "string" ? token.role : "USER",
        },
      };
    },
  },
} satisfies NextAuthConfig;
