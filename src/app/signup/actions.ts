"use server";

import { db } from "~/server/db";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");
  const nameRaw = formData.get("name");
  const roleRaw = formData.get("role");
  
  const email = typeof emailRaw === "string" ? emailRaw : "";
  const password = typeof passwordRaw === "string" ? passwordRaw : "";
  const name = typeof nameRaw === "string" ? nameRaw : "";
  const role = typeof roleRaw === "string" ? roleRaw : "USER";

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  await db.user.create({
    data: {
      email,
      password,
      name,
      role: role as "USER" | "CREATOR" | "ADMIN",
    },
  });

  redirect("/login");
}
